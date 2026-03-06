import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, InvalidElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef, useState } from 'react'
import { useReactComponentsLocalize } from '../../i18n/localize'
import { VoteButtonSlotProps } from '../context/types'
import { useComponents } from '../context/useComponents'

export const VoteButton = (props: ComponentPropsWithoutRef<'button'> & Record<string, unknown>) => {
  const { connected } = useClient()
  const {
    client,
    connected: electionConnected,
    loading: { voting },
    ConnectButton,
    isAbleToVote,
    election,
    voted,
    sik: { signature },
    sikSignature,
  } = useElection()
  const { VoteButton: Slot } = useComponents()
  const t = useReactComponentsLocalize()
  const [loading, setLoading] = useState(false)

  if (!election || election instanceof InvalidElection) {
    return null
  }

  const isDisabled = !client.wallet || !isAbleToVote || election.status !== ElectionStatus.ONGOING

  if (!connected && !electionConnected && ConnectButton) {
    return <ConnectButton />
  }

  const button: VoteButtonSlotProps = {
    type: 'submit' as const,
    ...(props as Omit<VoteButtonSlotProps, 'label' | 'type'>),
    form: `election-questions-${election.id}`,
    disabled: isDisabled,
    loading: voting,
    label: voted && isAbleToVote ? t('vote.button_update') : t('vote.button'),
  }

  if (connected && election.electionType.anonymous && !signature) {
    button.loading = loading
    button.type = 'button'
    button.disabled = !client.wallet || !isAbleToVote
    button.label = t('vote.sign')
    button.onClick = async () => {
      setLoading(true)
      try {
        sikSignature(await client.anonymousService.signSIKPayload(client.wallet))
      } finally {
        setLoading(false)
      }
    }
  }

  if ([ElectionStatus.ENDED, ElectionStatus.RESULTS].includes(election.status) && !voted && signature) {
    return <p>{t('errors.not_voted_in_ended_election')}</p>
  }

  return <Slot {...button} />
}
