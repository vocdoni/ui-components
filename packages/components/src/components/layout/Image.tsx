import { Image as CImage, ImageProps } from '@chakra-ui/image'

type IPFSImageProps = ImageProps & {
  gateway?: string
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

export const Image = ({src, ...props} : IPFSImageProps) => {
  if (!src) {
    return null
  }

  const link = linkify(src, props.gateway || 'https://infura-ipfs.io/ipfs/')

  return <CImage src={link} {...props} />
}
