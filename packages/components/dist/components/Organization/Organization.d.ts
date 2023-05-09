import { ChakraProps } from '@chakra-ui/system';
import { Account, AccountData } from '@vocdoni/sdk';
import { PropsWithChildren } from 'react';
export type OrganizationProviderProps = {
    id?: string;
    organization?: AccountData;
};
export declare const useOrganizationProvider: ({ id, organization: data, ...rest }: OrganizationProviderProps) => {
    organization: AccountData | undefined;
    error: string;
    loading: boolean;
    loaded: boolean;
    update: (account: Account, faucetPackage?: string) => Promise<void>;
};
export type OrganizationState = ReturnType<typeof useOrganizationProvider>;
export declare const OrganizationContext: import("react").Context<{
    organization: AccountData | undefined;
    error: string;
    loading: boolean;
    loaded: boolean;
    update: (account: Account, faucetPackage?: string) => Promise<void>;
} | undefined>;
export declare const useOrganization: () => {
    organization: AccountData | undefined;
    error: string;
    loading: boolean;
    loaded: boolean;
    update: (account: Account, faucetPackage?: string) => Promise<void>;
};
export type OrganizationProviderComponentProps = OrganizationProviderProps & ChakraProps;
export declare const OrganizationProvider: {
    ({ children, ...rest }: PropsWithChildren<OrganizationProviderComponentProps>): JSX.Element;
    displayName: string;
};
export declare const Organization: {
    (props: OrganizationProviderComponentProps): JSX.Element;
    displayName: string;
};
