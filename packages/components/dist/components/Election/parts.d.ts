import { HeadingProps } from '@chakra-ui/layout';
import { ChakraProps } from '@chakra-ui/system';
import { TagProps } from '@chakra-ui/tag';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import { IPFSImageProps } from '../layout';
export declare const ElectionTitle: import("@chakra-ui/system/dist/system.types").ComponentWithAs<"h1", HeadingProps>;
export declare const ElectionHeader: (props: IPFSImageProps) => JSX.Element | null;
export declare const ElectionDescription: (props: Omit<ReactMarkdownProps, 'children' | 'node'> & ChakraProps) => JSX.Element | null;
export type ElectionScheduleProps = HeadingProps & {
    format?: string;
};
export declare const ElectionSchedule: import("@chakra-ui/system/dist/system.types").ComponentWithAs<"h2", ElectionScheduleProps>;
export declare const ElectionStatusBadge: (props: TagProps) => JSX.Element | null;
