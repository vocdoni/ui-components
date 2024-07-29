import {
  AccountAPI,
  ChainAPI,
  ElectionAPI,
  ErrAPI,
  IAccountTransfersResponse,
  IChainBlockInfoResponse,
  IElectionListFilter,
  IElectionVotesCountResponse,
  VocdoniSDKClient,
  VoteAPI,
} from '@vocdoni/sdk'

export class ExtendedSDKClient extends VocdoniSDKClient {
  accountTransfers = (accountId: string, page?: number) =>
    AccountAPI.transfersList(this.url, accountId, page) as Promise<IAccountTransfersResponse>

  accountTransfersCount = (accountId: string) => AccountAPI.transfersCount(this.url, accountId)

  accountFees = (accountId: string, page?: number) => AccountAPI.fees(this.url, accountId, page)

  blockByHeight = (height: number) => ChainAPI.blockByHeight(this.url, height)

  blockByHash = (hash: string) => ChainAPI.blockByHash(this.url, hash)

  blockToDate = (height: number): ReturnType<typeof ChainAPI.blockToDate> => ChainAPI.blockToDate(this.url, height)

  blockTransactions = (height: number, page?: number) => ChainAPI.blockTransactions(this.url, height, page)

  blockList = (from: number, listSize: number = 10): Promise<Array<IChainBlockInfoResponse | BlockError>> => {
    const promises: Promise<IChainBlockInfoResponse | BlockError>[] = []
    // If is not a number bigger than 0
    if (isNaN(from)) return Promise.all(promises)
    for (let i = 0; i < listSize; i++) {
      if (from + i <= 0) continue
      promises.push(
        (async () => {
          try {
            return await this.blockByHeight(from + i)
          } catch (error) {
            if (error instanceof ErrAPI) {
              if (error.raw?.response?.status === 404) {
                return new BlockNotFoundError(from + i, error)
              }
              return new BlockError(from + i, error)
            }
            throw error // re-throw other errors
          }
        })()
      )
    }

    return Promise.all(promises).then((blockInfo) => {
      // flatten the array[][] into array[]
      // @ts-ignore
      return blockInfo.reduce((prev, cur) => prev.concat(cur), []).reverse()
    })
  }

  chainInfo = () => ChainAPI.info(this.url)

  electionVotesList = (electionId: string, page?: number) => ElectionAPI.votesList(this.url, electionId, page)

  electionVotesCount = (electionId: string) =>
    ElectionAPI.votesCount(this.url, electionId) as Promise<IElectionVotesCountResponse>

  electionKeys = (electionId: string) => ElectionAPI.keys(this.url, electionId)

  electionList = (page: number, filters: IElectionListFilter) =>
    ElectionAPI.electionsList(this.url, page, {
      ...filters,
    })

  // Lists all token fees ordered by date.
  feesList = (page?: number) => ChainAPI.feesList(this.url, page)
  //  Lists token fees filtered by a specific reference, ordered by date.
  feesListByReference = (reference: string, page?: number) => ChainAPI.feesListByReference(this.url, reference, page)
  // Lists token fees filtered by a specific transaction type, ordered by date.
  feesListByType = (type: string, page?: number) => ChainAPI.feesListByType(this.url, type, page)

  organizationList = (page?: number, organizationId?: string) =>
    ChainAPI.organizationList(this.url, page, organizationId)
  organizationCount = () => ChainAPI.organizationCount(this.url)

  txInfo = (txHash: string) => ChainAPI.txInfo(this.url, txHash)
  txInfoByBlock = (blockHeight: number, txIndex: number) => ChainAPI.txInfoByBlock(this.url, blockHeight, txIndex)
  txByIndex = (index: number) => ChainAPI.txByIndex(this.url, index)
  txList = (page?: number) => ChainAPI.txList(this.url, page)

  validatorsList = () => ChainAPI.validatorsList(this.url)
  voteInfo = (voteId: string) => VoteAPI.info(this.url, voteId)
}

export class BlockError extends ErrAPI {
  public height: number

  constructor(height: number, error: ErrAPI) {
    super(error.message, error.raw)
    this.height = height
  }
}

export class BlockNotFoundError extends BlockError {}
