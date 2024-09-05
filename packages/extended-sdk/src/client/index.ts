import {
  ChainAPI,
  ElectionAPI,
  ErrAPI,
  ErrBlockNotFound,
  FetchFeesParametersWithPagination,
  FetchOrganizationParametersWithPagination,
  FetchTransactionsParametersWithPagination,
  FetchTransfersParametersWithPagination,
  FetchVotesParametersWithPagination,
  PaginationRequest,
  VocdoniSDKClient,
  VoteAPI,
} from '@vocdoni/sdk'

export class ExtendedSDKClient extends VocdoniSDKClient {
  blockByHeight = (height: number) => ChainAPI.blockInfoHeight(this.url, height)

  blockByHash = (hash: string) => ChainAPI.blockInfoHash(this.url, hash)

  blockToDate = (height: number): ReturnType<typeof ChainAPI.blockToDate> => ChainAPI.blockToDate(this.url, height)

  blockList = (params: BlockListQueryParamsWithPagination) => ChainAPI.blocksList(this.url, params)

  chainInfo = () => ChainAPI.info(this.url)

  electionVotesList = (params: Partial<FetchVotesParametersWithPagination>) => VoteAPI.list(this.url, params)

  electionKeys = (electionId: string) => ElectionAPI.keys(this.url, electionId)

  feesList = (params?: Partial<FetchFeesParametersWithPagination> | undefined) => ChainAPI.feesList(this.url, params)

  organizationList = (params?: Partial<FetchOrganizationParametersWithPagination>) =>
    ChainAPI.organizationList(this.url, params)

  transfers = (params: Partial<FetchTransfersParametersWithPagination>) => ChainAPI.transfers(this.url, params)

  txCosts = () => ChainAPI.txCosts(this.url)
  txInfo = (txHash: string) => ChainAPI.txInfo(this.url, txHash)
  txList = (params?: Partial<FetchTransactionsParametersWithPagination>) => ChainAPI.txList(this.url, params)

  validatorsList = () => ChainAPI.validatorsList(this.url)
  voteInfo = (voteId: string) => VoteAPI.info(this.url, voteId)
}

// Not exported properly by the sdk, awaiting new version
export type BlockListQueryParamsWithPagination = {
  hash?: string // Filter by partial hash
  chainId?: string // Filter by exact chainId
} & PaginationRequest
