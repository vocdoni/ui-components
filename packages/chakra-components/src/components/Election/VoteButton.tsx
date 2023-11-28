import { Button, ButtonProps } from '@chakra-ui/button'
import { Signer } from '@ethersproject/abstract-signer'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ArchivedElection, ElectionStatus, InvalidElection } from '@vocdoni/sdk'
import { useState } from 'react'
import { SpreadsheetAccess } from './SpreadsheetAccess'

export const VoteButton = (props: ButtonProps) => {
  const { connected } = useClient()
  const {
    client,
    loading: { voting },
    connected: lconnected,
    ConnectButton,
    isAbleToVote,
    election,
    voted,
    localize,
    sik: { signature },
    sikSignature,
  } = useElection()
  const [loading, setLoading] = useState<boolean>(false)
  const isDisabled = !client.wallet || !isAbleToVote || election?.status !== ElectionStatus.ONGOING

  if (election instanceof InvalidElection || election instanceof ArchivedElection) return null

  if (!connected && election?.get('census.type') !== 'spreadsheet' && ConnectButton) {
    return <ConnectButton />
  }

  if (!lconnected && election?.get('census.type') === 'spreadsheet') {
    return <SpreadsheetAccess />
  }

  const button: ButtonProps = {
    type: 'submit',
    ...props,
    form: `election-questions-${election?.id}`,
    isDisabled,
    isLoading: voting,
    children: voted && isAbleToVote ? localize('vote.button_update') : localize('vote.button'),
  }

  if (connected && election?.electionType.anonymous && !signature) {
    button.isLoading = loading
    button.type = 'button'
    button.children = localize('vote.sign')
    button.onClick = async () => {
      setLoading(true)
      try {
        sikSignature(await client.anonymousService.signSIKPayload(client.wallet as Signer))
      } catch (e) {}
      setLoading(false)
    }
  }

  return <Button {...button} />
}
