import { ChakraProps } from '@chakra-ui/system';
import { Signer } from '@ethersproject/abstract-signer';
import { Wallet } from '@ethersproject/wallet';
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk';
import { ComponentType, PropsWithChildren } from 'react';
import { FieldValues } from 'react-hook-form';
export type ElectionProviderProps = {
    id?: string;
    election?: PublishedElection;
    signer?: Wallet | Signer;
    ConnectButton?: ComponentType;
    fetchCensus?: boolean;
    texts?: ElectionTextsType;
};
export type ElectionTextsType = Record<ElectionStatus, string> & {
    required?: string;
    empty?: string;
    vote?: string;
    voted?: string;
};
export declare const useElectionProvider: ({ id, election: data, signer: s, fetchCensus, texts, ...rest }: ElectionProviderProps) => {
    election: PublishedElection | undefined;
    error: string;
    isAbleToVote: boolean | undefined;
    isInCensus: boolean;
    loading: boolean;
    signer: Wallet | Signer;
    trans: (key: keyof ElectionTextsType, def: string) => string | undefined;
    vote: (values: FieldValues) => Promise<void>;
    voted: string | null;
    votesLeft: number;
    voting: boolean;
    ConnectButton?: ComponentType | undefined;
};
export type ElectionState = ReturnType<typeof useElectionProvider>;
export declare const ElectionContext: import("react").Context<{
    election: PublishedElection | undefined;
    error: string;
    isAbleToVote: boolean | undefined;
    isInCensus: boolean;
    loading: boolean;
    signer: Wallet | Signer;
    trans: (key: keyof ElectionTextsType, def: string) => string | undefined;
    vote: (values: FieldValues) => Promise<void>;
    voted: string | null;
    votesLeft: number;
    voting: boolean;
    ConnectButton?: ComponentType | undefined;
} | undefined>;
export declare const useElection: () => {
    election: PublishedElection | undefined;
    error: string;
    isAbleToVote: boolean | undefined;
    isInCensus: boolean;
    loading: boolean;
    signer: Wallet | Signer;
    trans: (key: keyof ElectionTextsType, def: string) => string | undefined;
    vote: (values: FieldValues) => Promise<void>;
    voted: string | null;
    votesLeft: number;
    voting: boolean;
    ConnectButton?: ComponentType | undefined;
};
export type ElectionProviderComponentProps = ElectionProviderProps & ChakraProps;
export declare const ElectionProvider: {
    ({ children, ...rest }: PropsWithChildren<ElectionProviderComponentProps>): JSX.Element;
    displayName: string;
};
export declare const Election: {
    (props: ElectionProviderComponentProps): JSX.Element;
    displayName: string;
};
