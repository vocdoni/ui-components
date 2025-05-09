import { ButtonGroup, chakra, IconButton, useMultiStyleConfig } from '@chakra-ui/react'
import { useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { ElectionActionProps } from '../../../types'
import { ActionsProvider } from './ActionsProvider'
import { ActionCancel } from './Cancel'
import { ActionContinue } from './Continue'
import { ActionEnd } from './End'
import { ActionPause } from './Pause'

const Cross = chakra(ImCross)
const Play = chakra(FaPlay)
const Pause = chakra(FaPause)
const Stop = chakra(FaStop)

export const ElectionActions = (props: ElectionActionProps) => {
  const { localize, account } = useClient()
  const { election } = useElection()
  const styles = useMultiStyleConfig('ElectionActions')

  if (!election || !(election instanceof PublishedElection)) return null

  const isOwner = areEqualHexStrings(election.organizationId, account?.address)

  if (!isOwner) return null

  return (
    <ButtonGroup sx={styles.wrapper} {...props}>
      <ActionsProvider>
        {election.status === ElectionStatus.ONGOING && (
          <IconButton
            aria-label={localize('process_actions.pause', { defaultValue: 'Pause' })}
            icon={<Pause />}
            as={ActionPause}
          />
        )}
        {election.status === ElectionStatus.PAUSED && (
          <IconButton
            aria-label={localize('process_actions.continue', { defaultValue: 'Continue' })}
            icon={<Play />}
            as={ActionContinue}
          />
        )}
        <IconButton
          aria-label={localize('process_actions.end', { defaultValue: 'End' })}
          icon={<Stop />}
          as={ActionEnd}
        />
        <IconButton
          aria-label={localize('process_actions.cancel', { defaultValue: 'Cancel' })}
          icon={<Cross />}
          as={ActionCancel}
        />
      </ActionsProvider>
    </ButtonGroup>
  )
}
ElectionActions.displayName = 'ElectionActions'
