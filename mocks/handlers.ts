import { rest } from 'msw'

export const handlers = [
  rest.get('https://api*.vocdoni.net/v2/accounts/*', (req, res, ctx) => {
    const id = req.params[1]
    return res(
      ctx.status(200),
      ctx.json({
        address: id,
        nonce: 62,
        balance: 4987085,
        electionIndex: 42,
        infoURL: 'ipfs://bafybeiebhal46gmhx3y7qbrfsgm5zsmrio5bmzwutg6fodkfysxr2e5t34',
        metadata: {
          version: '1.0',
          name: { default: 'testing account' },
          description: { default: '' },
          newsFeed: { default: '' },
          media: { avatar: 'https://pbs.twimg.com/profile_images/1546527030329606150/BmyiyT2I_400x400.jpg' },
          meta: {},
        },
      })
    )
  }),
  rest.get('https://api*.vocdoni.net/v2/elections/*', (req, res, ctx) => {
    const id = req.params[1]
    return res(
      ctx.status(200),
      ctx.json({
        electionId: id,
        organizationId: '389b35ebcf34f9e0e8b32b5468216a699fde0c97',
        status: 'RESULTS',
        startDate: '2023-08-03T15:10:57.829010914Z',
        endDate: '2023-09-01T01:25:08.672843671Z',
        voteCount: 1,
        finalResults: true,
        result: [
          ['0', '1', '0'],
          ['0', '1', '0'],
        ],
        census: {
          censusOrigin: 'OFF_CHAIN_TREE_WEIGHTED',
          censusRoot: 'cc6c247592db36bbe2b7ecee18716ef28605c97f3c5a52479c154bc20ecafa8f',
          postRegisterCensusRoot: '',
          censusURL: 'ipfs://bafybeia4w63agvgs5x5zhmcxtvfzlnahltzzvbubragtne26e6ua7rivvm',
          maxCensusSize: 2,
        },
        metadataURL: 'ipfs://bafybeiaszamrceo4n5kcipcr5cnr5iozbg5zgj3nys2s5tjae7kubyl2fe',
        creationTime: '2023-08-03T15:10:47Z',
        voteMode: {
          serial: false,
          anonymous: false,
          encryptedVotes: false,
          uniqueValues: false,
          costFromWeight: false,
        },
        electionMode: {
          autoStart: true,
          interruptible: true,
          dynamicCensus: false,
          encryptedMetaData: false,
          preRegister: false,
        },
        tallyMode: { maxCount: 2, maxValue: 2, maxVoteOverwrites: 1, maxTotalCost: 0, costExponent: 10000 },
        metadata: {
          title: { default: 'mocked process' },
          version: '1.1',
          description: { default: '' },
          media: {},
          meta: { sdk: { version: '0.0.16' } },
          questions: [
            {
              choices: [
                { title: { default: '一' }, value: 0 },
                { title: { default: '二' }, value: 1 },
                { title: { default: '三' }, value: 2 },
              ],
              description: { default: '' },
              title: { default: '最初の質問' },
            },
            {
              choices: [
                { title: { default: 'eins' }, value: 0 },
                { title: { default: 'zwei' }, value: 1 },
              ],
              description: { default: '' },
              title: { default: 'das ist eine andere frage' },
            },
          ],
          results: { aggregation: 'discrete-counting', display: 'multiple-question' },
        },
      })
    )
  }),
  rest.get('https://api*.vocdoni.net/v2/censuses/*/size', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        size: 2,
      })
    )
  }),
  rest.get('https://api*.vocdoni.net/v2/censuses/*/weight', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        weight: 2,
      })
    )
  }),
  rest.get('https://api*.vocdoni.net/v2/censuses/*/type', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        type: 'weighted',
      })
    )
  }),
]
