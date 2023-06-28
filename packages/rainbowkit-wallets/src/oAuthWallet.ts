import { oAuthConnector } from './wagmi/oAuthConnector'

export const oAuthWallet = ({ chains }: any) => ({
  id: 'oAuth',
  name: 'OAuth',
  iconUrl: 'https://svgshare.com/i/iJK.svg',
  iconBackground: '#fff',
  createConnector: () => {
    const connector = new oAuthConnector({
      chains: chains,
      options: {},
    })
    return {
      connector,
    }
  },
})
