import { CensusType, CspProofType, PublishedElection, VocdoniSDKClient, Vote, WeightedCensus } from '@vocdoni/sdk'
import { vote } from './index'

var upFetchMock: jest.Mock

jest.mock('up-fetch', () => {
  upFetchMock = jest.fn()
  return {
    up: jest.fn(() => upFetchMock),
  }
})

describe('csp vote', () => {
  beforeEach(() => {
    upFetchMock.mockReset()
  })

  it('parses hex weights without 0x prefix', async () => {
    upFetchMock.mockResolvedValue({ signature: 'sig', weight: '0a' })

    const client = {
      wallet: { getAddress: jest.fn().mockResolvedValue('0xabc') },
      cspVote: jest.fn(() => ({ weight: BigInt(1) })),
      submitVote: jest.fn().mockResolvedValue('vote-id'),
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
