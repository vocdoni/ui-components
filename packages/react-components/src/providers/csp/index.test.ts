import { CensusType, CspProofType, PublishedElection, VocdoniSDKClient, Vote, WeightedCensus } from '@vocdoni/sdk'
import { fetchCheckMembership, vote } from './index'

const { upFetchMock } = vi.hoisted(() => ({
  upFetchMock: vi.fn(),
}))

vi.mock('up-fetch', () => {
  return {
    up: vi.fn(() => upFetchMock),
  }
})

describe('csp vote', () => {
  beforeEach(() => {
    upFetchMock.mockReset()
  })

  it('parses hex weights without 0x prefix', async () => {
    upFetchMock.mockResolvedValue({ signature: 'sig', weight: '0a' })

    const client = {
      wallet: { getAddress: vi.fn().mockResolvedValue('0xabc') },
      cspVote: vi.fn(() => ({ weight: BigInt(1) })),
      submitVote: vi.fn().mockResolvedValue('vote-id'),
    } as unknown as VocdoniSDKClient

    const census = new WeightedCensus()
    census.type = CensusType.CSP
    census.censusURI = 'https://csp.example/api'

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'csp-election',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census,
      electionType: { anonymous: false },
      voteType: { maxVoteOverwrites: 0, maxCount: 1, maxValue: 1 },
    })

    const vid = await vote(client, election, 'token', new Vote([1]))

    expect(vid).toBe('vote-id')
    expect(client.cspVote).toHaveBeenCalledWith(expect.any(Vote), 'sig', CspProofType.ECDSA_PIDSALTED)
    expect(client.submitVote).toHaveBeenCalledWith(expect.objectContaining({ weight: BigInt(10) }))
  })
})

describe('fetchCheckMembership', () => {
  beforeEach(() => {
    upFetchMock.mockReset()
  })

  it('posts to the bundle ${censusURI}/check endpoint with token and electionId', async () => {
    upFetchMock.mockResolvedValue({ belongs: true, weight: '0a', hasVoted: false })

    const result = await fetchCheckMembership({
      endpoint: 'https://csp.example/process/bundle/abc',
      authToken: 'token',
      electionId: 'election-1',
    })

    expect(upFetchMock).toHaveBeenCalledWith('https://csp.example/process/bundle/abc/check', {
      method: 'POST',
      body: { authToken: 'token', electionId: 'election-1' },
    })
    expect(result).toEqual({ belongs: true, weight: '0a', hasVoted: false })
  })

  it('omits electionId from the body when not provided', async () => {
    upFetchMock.mockResolvedValue({ belongs: false, hasVoted: false })

    await fetchCheckMembership({ endpoint: 'https://csp.example/process/bundle/abc', authToken: 'token' })

    expect(upFetchMock).toHaveBeenCalledWith('https://csp.example/process/bundle/abc/check', {
      method: 'POST',
      body: { authToken: 'token' },
    })
  })
})
