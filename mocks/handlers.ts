import { rest } from 'msw'

export const handlers = [
  rest.get('https://api*.vocdoni.*/v2/chain/info', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        chainId: 'vocdoni/DEV/31',
        blockTime: [10252, 10355, 10394, 10437, 10409],
        electionCount: 1223,
        organizationCount: 725,
        genesisTime: '2024-01-12T01:00:00Z',
        height: 134359,
        syncing: false,
        blockTimestamp: 1706705296,
        transactionCount: 72027,
        validatorCount: 3,
        voteCount: 68428,
        circuitVersion: 'v1.0.0',
        maxCensusSize: 100000,
        networkCapacity: 20000,
      })
    )
  }),
  rest.post('https://api*.vocdoni.*/v2/files/cid', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(generateRandomCID()))
  }),
  rest.get('https://api*.vocdoni.*/v2/accounts/*', (req, res, ctx) => {
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
  rest.post('https://api*.vocdoni.*/v2/accounts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.body('0xmocked'))
  }),
  rest.get('https://api*.vocdoni.*/v2/chain/transactions/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.body('ok'))
  }),
  rest.post('https://api*.vocdoni.*/v2/accounts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json('0xinvented'))
  }),
  rest.get('https://api*.vocdoni.*/v2/elections/*', (req, res, ctx) => {
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
          type: {
            name: 'single-choice-multiquestion',
            properties: {},
          },
        },
      })
    )
  }),
  rest.get('https://api*.vocdoni.*/v2/censuses/*/size', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        size: 2,
      })
    )
  }),
  rest.get('https://api*.vocdoni.*/v2/censuses/*/weight', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        weight: 2,
      })
    )
  }),
  rest.get('https://api*.vocdoni.*/v2/censuses/*/type', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        type: 'weighted',
      })
    )
  }),
]

const generateRandomCID = (): string => {
  const characters = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  const length = 46
  let result = 'Qm'

  for (let i = 2; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}
