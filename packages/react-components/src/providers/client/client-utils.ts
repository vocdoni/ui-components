import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { EnvOptions, VocdoniCensus3Client, VocdoniSDKClient } from '@vocdoni/sdk'

export const CLIENT_ENVS = [EnvOptions.DEV, EnvOptions.PROD] as const
export type ClientEnv = (typeof CLIENT_ENVS)[number] | `${(typeof CLIENT_ENVS)[number]}`

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

export const hasSigner = (wallet: unknown): boolean => {
  return !!wallet && typeof (wallet as { getAddress?: unknown }).getAddress === 'function'
}

export const normalizeClientEnv = (env?: ClientEnv | EnvOptions): (typeof CLIENT_ENVS)[number] => {
  if (env === EnvOptions.PROD) return EnvOptions.PROD
  return EnvOptions.DEV
}

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
