import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { EnvOptions, VocdoniCensus3Client, VocdoniSDKClient } from '@vocdoni/sdk'

export type ClientEnv = `${EnvOptions}` | EnvOptions

export type ClientReducerPropsOptions = {
  api_url?: string
  faucet_url?: string
}

export type Census3Options = {
  api_url?: string
}

export type ClientReducerProps = {
  client?: VocdoniSDKClient
  env?: ClientEnv
  signer?: Wallet | Signer
  options?: ClientReducerPropsOptions
  census3Options?: Census3Options
}

export type ClientSetPayload = VocdoniSDKClient

export const newVocdoniSDKClient = (
  env: EnvOptions,
  signer: Wallet | Signer | undefined,
  options: ClientReducerPropsOptions | undefined
): VocdoniSDKClient => {
  return new VocdoniSDKClient({
    env,
    wallet: signer,
    faucet: options?.faucet_url ? { url: options.faucet_url } : undefined,
    api_url: options?.api_url || undefined,
  })
}

export const newVocdoniCensus3 = (env: EnvOptions, api_url?: string): VocdoniCensus3Client => {
  return new VocdoniCensus3Client({ env, api_url })
}
