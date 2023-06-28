import { inputsConnector } from './wagmi/inputsConnector'

export const inputsWallet = ({ chains }: any) => ({
  id: 'inputs',
  name: 'Inputs',
  iconUrl: 'https://svgshare.com/i/iJK.svg',
  iconBackground: '#fff',
  createConnector: () => {
    const connector = new inputsConnector({
      chains: chains,
      options: {},
    })
    return {
      connector,
    }
  },
})
