import { PublishedElection } from '@vocdoni/sdk'

export type SerializedElection = Record<string, any>
export type ElectionLike = PublishedElection | SerializedElection

const hasConstructorName = (value: unknown, name: string) =>
  isObject(value) && typeof value.constructor?.name === 'string' && value.constructor.name === name

const isObject = (value: unknown): value is Record<string, any> => typeof value === 'object' && value !== null

const withDefaultText = (value: unknown) => {
  if (isObject(value) && isObject(value.default)) return value
  if (typeof value === 'string') return { default: value }
  return value
}

const toPublicCensusShape = (census: unknown) => {
  if (!isObject(census)) return census

  return {
    ...census,
    type: census.type ?? census._type,
    size: census.size ?? census._size,
    weight: census.weight ?? census._weight,
    censusId: census.censusId ?? census._censusId,
    censusURI: census.censusURI ?? census._censusURI,
    salt: census.salt ?? census._salt,
    participants: census.participants ?? census._participants,
  }
}

const toPublicElectionTypeShape = (value: unknown) => {
  if (!isObject(value)) return value
  return {
    ...value,
    anonymous: value.anonymous ?? value._anonymous,
    secretUntilTheEnd: value.secretUntilTheEnd ?? value._secretUntilTheEnd,
  }
}

const toPublicVoteTypeShape = (value: unknown) => {
  if (!isObject(value)) return value
  return {
    ...value,
    maxCount: value.maxCount ?? value._maxCount,
    maxVoteOverwrites: value.maxVoteOverwrites ?? value._maxVoteOverwrites,
  }
}

const toPublicResultsTypeShape = (value: unknown) => {
  if (!isObject(value)) return value
  return {
    ...value,
    name: value.name ?? value._name,
    properties: value.properties ?? value._properties,
  }
}

const toPublicElectionShape = (election: ElectionLike) => {
  if (!isObject(election)) return election
  const source = election as Record<string, any>

  const snapshot = {
    ...source,
    id: source.id ?? source._id,
    title: withDefaultText(source.title ?? source._title),
    description: withDefaultText(source.description ?? source._description),
    header: source.header ?? source._header,
    startDate: source.startDate ?? source._startDate,
    endDate: source.endDate ?? source._endDate,
    creationTime: source.creationTime ?? source._creationTime,
    status: source.status ?? source._status,
    questions: source.questions ?? source._questions ?? [],
    census: toPublicCensusShape(source.census ?? source._census),
    electionType: toPublicElectionTypeShape(source.electionType ?? source._electionType),
    voteType: toPublicVoteTypeShape(source.voteType ?? source._voteType),
    resultsType: toPublicResultsTypeShape(source.resultsType ?? source._resultsType),
    meta: source.meta ?? source._meta,
    organizationId: source.organizationId ?? source._organizationId,
    results: source.results ?? source._results,
    voteCount: source.voteCount ?? source._voteCount,
    maxCensusSize: source.maxCensusSize ?? source._maxCensusSize,
  }

  return {
    ...snapshot,
    get: (path: string) => getElectionField(snapshot as ElectionLike, path),
  }
}

export const getElectionField = (election: ElectionLike | undefined, path: string) => {
  if (!election) return undefined

  if (typeof (election as { get?: unknown }).get === 'function') {
    try {
      return (election as { get: (path: string) => unknown }).get(path)
    } catch {}
  }

  return path.split('.').reduce<unknown>((value, key) => {
    if (!isObject(value)) return undefined
    return value[key]
  }, election)
}

export const getElectionTitle = (election: ElectionLike | undefined) => {
  const source = election as Record<string, any> | undefined
  return source?.title?.default || source?._title?.default || source?.id || source?._id
}

export const getElectionDescription = (election: ElectionLike | undefined) => {
  const source = election as Record<string, any> | undefined
  return source?.description?.default || source?._description?.default
}

export const getElectionStatus = (election: ElectionLike | undefined) => {
  const source = election as Record<string, any> | undefined
  return (source?.status || source?._status) as string | undefined
}

export const getElectionDate = (
  election: ElectionLike | undefined,
  field: 'startDate' | 'endDate' | 'creationTime'
) => {
  const value = election?.[field]
  if (!value) return undefined
  return value instanceof Date ? value : new Date(value)
}

export const isInvalidElectionLike = (election: ElectionLike | undefined) => {
  return hasConstructorName(election, 'InvalidElection') || getElectionStatus(election) === 'PROCESS_UNKNOWN'
}

export const isPublishedElectionLike = (election: ElectionLike | undefined) => {
  return !!election && !isInvalidElectionLike(election)
}

export const normalizeElection = (election?: ElectionLike) => {
  if (!election) return undefined
  if (election instanceof PublishedElection || hasConstructorName(election, 'InvalidElection')) return election

  const normalized = toPublicElectionShape(election)
  const builder = (PublishedElection as unknown as { build?: (value: ElectionLike) => ElectionLike }).build
  if (typeof builder === 'function') {
    try {
      const revived = builder(normalized)
      if (!hasConstructorName(revived, 'InvalidElection')) {
        return revived
      }
    } catch {}
  }

  return normalized
}
