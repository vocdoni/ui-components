import {
  AccountAPI,
  ChainAPI,
  ElectionAPI,
  ErrAPI,
  IChainBlockInfoResponse,
  IElectionListFilter,
  VocdoniSDKClient,
  VoteAPI,
} from '@vocdoni/sdk'

// Sorry for this, but we need to publish and the type isn't yet exported from the SDK...
// TODO: remove when it's properly exported
interface IElectionVotesCountResponse {
  /**
   * The number of votes
   */
  count: number
}

export class ExtendedSDKClient extends VocdoniSDKClient {
  accountTransfers = (accountId: string, page?: number) => AccountAPI.transfersList(this.url, accountId, page)
  accountTransfersCount = (accountId: string) => AccountAPI.transfersCount(this.url, accountId)
  accountFees = (accountId: string, page?: number) => AccountAPI.fees(this.url, accountId, page)
  txInfo = (txHash: string) => ChainAPI.txInfo(this.url, txHash)
  txInfoByBlock = (blockHeight: number, txIndex: number) => ChainAPI.txInfoByBlock(this.url, blockHeight, txIndex)
  txList = (page?: number) => ChainAPI.txList(this.url, page)
  organizationList = (page?: number, organizationId?: string) =>
    ChainAPI.organizationList(this.url, page, organizationId)
  organizationCount = () => ChainAPI.organizationCount(this.url)
  validatorsList = () => ChainAPI.validatorsList(this.url)
  chainInfo = () => ChainAPI.info(this.url)
  blockByHash = (hash: string) => ChainAPI.blockByHash(this.url, hash)
  voteInfo = (voteId: string) => VoteAPI.info(this.url, voteId)
  electionVotesList = (electionId: string, page?: number) => ElectionAPI.votesList(this.url, electionId, page)
  electionVotesCount = (electionId: string) =>
    ElectionAPI.votesCount(this.url, electionId) as Promise<IElectionVotesCountResponse>
  electionKeys = (electionId: string) => ElectionAPI.keys(this.url, electionId)
  electionList = (page: number, filters: IElectionListFilter) =>
    ElectionAPI.electionsList(this.url, page, {
      ...filters,
    })
  blockTransactions = (height: number, page?: number) => ChainAPI.blockTransactions(this.url, height, page)

  blockByHeight = (height: number) => ChainAPI.blockByHeight(this.url, height)

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

  blockToDate = (height: number): ReturnType<typeof ChainAPI.blockToDate> => {
    return ChainAPI.blockToDate(this.url, height)
  }
}

export class BlockError extends ErrAPI {
  public height: number

  constructor(height: number, error: ErrAPI) {
    super(error.message, error.raw)
    this.height = height
  }
}

export class BlockNotFoundError extends BlockError {}
