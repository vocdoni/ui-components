import { Image as CImage, ImageProps } from '@chakra-ui/image'

export type IPFSImageProps = ImageProps & {
  gateway?: string
  fallback?: string
}

export const linkify = (link: string | undefined, gateway: string) => {
  if (typeof link === 'undefined') {
    return
  }

  if (!link.startsWith('ipfs')) {
    return link
  }

  const matches = link.match(/(?:ipfs:\/\/)?(.*)/)

  if (!matches) {
    // probably a wrong ipfs formatted link
    return link
  }

  const [, pin] = matches

  return gateway + pin
}

export const Image = ({ src, fallback, ...props }: IPFSImageProps) => {
  if (!src && !fallback) {
    return null
  }

  const link = linkify(src || fallback, props.gateway || 'https://infura-ipfs.io/ipfs/')

  return <CImage src={link} {...props} />
}
