import { ImageProps } from '@chakra-ui/image';
export type IPFSImageProps = ImageProps & {
    gateway?: string;
};
export declare const linkify: (link: string | undefined, gateway: string) => string | undefined;
export declare const Image: ({ src, ...props }: IPFSImageProps) => JSX.Element | null;
