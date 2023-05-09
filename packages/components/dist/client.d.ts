import { Signer } from '@ethersproject/abstract-signer';
import { Wallet } from '@ethersproject/wallet';
import { AccountData, ClientOptions, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk';
import { ReactNode } from 'react';
export interface ClientSettings extends ClientOptions {
}
type ClientProviderProps = {
    env?: Lowercase<keyof typeof EnvOptions>;
    client?: VocdoniSDKClient;
    signer?: Wallet | Signer;
};
export declare const useClientProvider: ({ env: e, client: c, signer: s }: ClientProviderProps) => {
    account: AccountData | undefined;
    balance: number;
    client: VocdoniSDKClient;
    env: string;
    signer: Wallet | Signer;
    generateSigner: (seed?: string | string[]) => Wallet;
    fetchAccount: () => Promise<AccountData | undefined>;
    fetchBalance: () => Promise<void>;
    setClient: import("react").Dispatch<import("react").SetStateAction<VocdoniSDKClient>>;
    setSigner: (signer: Wallet | Signer) => void;
};
export type ClientState = ReturnType<typeof useClientProvider>;
export declare const ClientContext: import("react").Context<{
    account: AccountData | undefined;
    balance: number;
    client: VocdoniSDKClient;
    env: string;
    signer: Wallet | Signer;
    generateSigner: (seed?: string | string[]) => Wallet;
    fetchAccount: () => Promise<AccountData | undefined>;
    fetchBalance: () => Promise<void>;
    setClient: import("react").Dispatch<import("react").SetStateAction<VocdoniSDKClient>>;
    setSigner: (signer: Wallet | Signer) => void;
} | undefined>;
export declare const useClientContext: <T extends VocdoniSDKClient>() => {
    client: T;
    account: AccountData | undefined;
    balance: number;
    env: string;
    signer: Wallet | Signer;
    generateSigner: (seed?: string | string[]) => Wallet;
    fetchAccount: () => Promise<AccountData | undefined>;
    fetchBalance: () => Promise<void>;
    setClient: import("react").Dispatch<import("react").SetStateAction<VocdoniSDKClient>>;
    setSigner: (signer: Wallet | Signer) => void;
};
type ClientProviderComponentProps = ClientProviderProps & {
    children?: ReactNode;
};
export declare const ClientProvider: ({ env, client, signer, ...rest }: ClientProviderComponentProps) => JSX.Element;
export {};
