import {
  AccountAPI,
  ChainAPI,
  ElectionAPI,
  ErrAPI,
  FetchFeesParametersWithPagination,
  FetchOrganizationParametersWithPagination,
  FetchTransactionsParametersWithPagination,
  FetchVotesParametersWithPagination,
  IChainBlockInfoResponse,
  PaginationRequest,
  PaginationResponse,
  VocdoniSDKClient,
  VoteAPI,
} from '@vocdoni/sdk'

export class ExtendedSDKClient extends VocdoniSDKClient {
  accountTransfers = (accountId: string, page?: number) => AccountAPI.transfersList(this.url, accountId, page)

  // accountTransfersCount = (accountId: string) => AccountAPI.transfersCount(this.url, accountId)

  blockByHeight = (height: number) => ChainAPI.blockByHeight(this.url, height)

  blockByHash = (hash: string) => ChainAPI.blockByHash(this.url, hash)

  blockToDate = (height: number): ReturnType<typeof ChainAPI.blockToDate> => ChainAPI.blockToDate(this.url, height)

  blockList = ({
    totalItems, // Needed to construct the pagination response and first block of the page
    page,
    limit = 10,
  }: BlockListParametersWithPagination): Promise<BlockListResponseWithPagination> => {
    const promises: Promise<IChainBlockInfoResponse | BlockError>[] = []

    // Calculate the first block index for the reuqested page
    const firstPageBlock = totalItems - page * limit + 1 - limit

    for (let i = 0; i < limit; i++) {
      if (firstPageBlock + i <= 0) continue
      promises.push(
        (async () => {
          try {
            return await this.blockByHeight(firstPageBlock + i)
          } catch (error) {
            if (error instanceof ErrAPI) {
              if (error.raw?.response?.status === 404) {
                return new BlockNotFoundError(firstPageBlock + i, error)
              }
              return new BlockError(firstPageBlock + i, error)
            }
            throw error // re-throw other errors
          }
        })()
      )
    }

    const lastPage = Math.ceil(totalItems / limit)

    return Promise.all(promises).then((blockInfo) => {
      // flatten the array[][] into array[]
      return {
        // @ts-ignore
        blocks: blockInfo.reverse(),
        pagination: {
          totalItems,
          previousPage: page > 0 ? page - 1 : 0,
          currentPage: page,
          nextPage: page < lastPage ? page + 1 : lastPage,
          lastPage: lastPage,
        },
      }
    })
  }

  chainInfo = () => ChainAPI.info(this.url)

  electionVotesList = (params: Partial<FetchVotesParametersWithPagination>) => VoteAPI.list(this.url, params)

  // Deprecated
  // electionVotesCount = (electionId: string) =>
  //   ElectionAPI.votesCount(this.url, electionId) as Promise<IElectionVotesCountResponse>

  electionKeys = (electionId: string) => ElectionAPI.keys(this.url, electionId)

  feesList = (params?: Partial<FetchFeesParametersWithPagination> | undefined) => ChainAPI.feesList(this.url, params)

  organizationList = (params?: Partial<FetchOrganizationParametersWithPagination>) =>
    ChainAPI.organizationList(this.url, params)

  // Deprecated
  // organizationCount = () => ChainAPI.organizationCount(this.url)

  txInfo = (txHash: string) => ChainAPI.txInfo(this.url, txHash)
  txInfoByBlock = (blockHeight: number, txIndex: number) => ChainAPI.txInfoByBlock(this.url, blockHeight, txIndex)
  txByIndex = (index: number) => ChainAPI.txByIndex(this.url, index)
  txList = (params?: Partial<FetchTransactionsParametersWithPagination>) => ChainAPI.txList(this.url, params)

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

export type BlockListResponseWithPagination = {
  blocks: Array<IChainBlockInfoResponse | BlockError>
} & PaginationResponse

export type BlockListParametersWithPagination = {
  totalItems: number
} & PaginationRequest
