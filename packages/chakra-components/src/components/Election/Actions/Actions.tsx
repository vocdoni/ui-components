import { ButtonGroup, chakra, ChakraProps, IconButton, useMultiStyleConfig } from '@chakra-ui/react'
import { useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { ActionsProvider } from './ActionsProvider'
import { ActionCancel } from './Cancel'
import { ActionContinue } from './Continue'
import { ActionEnd } from './End'
import { ActionPause } from './Pause'

const Cancel = chakra(ImCross)
const Play = chakra(FaPlay)
const Pause = chakra(FaPause)
const Stop = chakra(FaStop)

export const ElectionActions = (props: ChakraProps) => {
  const { localize, account } = useClient()
  const { election } = useElection()
  const styles = useMultiStyleConfig('ElectionActions')

  if (
    !election ||
    !(election instanceof PublishedElection) ||
    (election && !areEqualHexStrings(election.organizationId, account?.address)) ||
    [ElectionStatus.CANCELED, ElectionStatus.ENDED, ElectionStatus.RESULTS].includes(election.status)
  ) {
    return null
  }

  return (
    <ButtonGroup size='sm' isAttached variant='outline' position='relative' sx={styles.group} {...props}>
      <ActionsProvider>
        <ActionContinue
          as={IconButton}
          aria-label={localize('actions.continue')}
          title={localize('actions.continue')}
          sx={styles.buttons}
          icon={<Play sx={styles.icons} />}
        />
        <ActionPause
          as={IconButton}
          aria-label={localize('actions.pause')}
          title={localize('actions.pause')}
          sx={styles.buttons}
          icon={<Pause sx={styles.icons} />}
        />
        <ActionEnd
          as={IconButton}
          aria-label={localize('actions.end')}
          title={localize('actions.end')}
          sx={styles.buttons}
          icon={<Stop sx={styles.icons} />}
        />
        <ActionCancel
          as={IconButton}
          aria-label={localize('actions.cancel')}
          title={localize('actions.cancel')}
          sx={styles.buttons}
          icon={<Cancel sx={styles.icons} />}
        />
      </ActionsProvider>
    </ButtonGroup>
  )
}
