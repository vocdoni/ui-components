import { ReactNode } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useClient, useElection } from '~providers'
import { environment } from '~src/environment'

export const Voted = () => {
  const { env } = useClient()
  const { voted } = useElection()
  const { Voted: Slot } = useComponents()
  const t = useReactComponentsLocalize()

  if (!voted) return null

  const description = t('vote.voted_description', { id: voted })
  const parts = description.split(voted)
  const descriptionContent: ReactNode =
    parts.length > 1
      ? parts.reduce<ReactNode[]>((acc, part, index) => {
          acc.push(part)
          if (index < parts.length - 1) {
            acc.push(
              <a key={`link-${index}`} href={environment.verifyVote(env, voted)} target='_blank' rel='noreferrer'>
                {voted}
              </a>
            )
          }
          return acc
        }, [])
      : description

  return <Slot title={t('vote.voted_title')} description={descriptionContent} />
}
