/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-anonymous-default-export */

import { IBaseWorkerResponse } from './useWebWorker'

export interface ICircuit {
  zKeyData: Uint8Array
  zKeyHash: string
  zKeyURI: string
  vKeyData: Uint8Array
  vKeyHash: string
  vKeyURI: string
  wasmData: Uint8Array
  wasmHash: string
  wasmURI: string
}

export interface ICircuitWorkerRequest {
  circuits: {
    zKeyURI: string
    zKeyHash: string
    vKeyURI: string
    vKeyHash: string
    wasmURI: string
    wasmHash: string
  }
}

export interface IWorkerResponse extends IBaseWorkerResponse<ICircuit> {}

export default () => {
  self.addEventListener('message', async (e: MessageEvent<ICircuitWorkerRequest>) => {
    try {
      const { circuits } = e.data

      const circuitsData: ICircuit = {
        zKeyData: await fetch(circuits.zKeyURI)
          .then((res) => res.arrayBuffer())
          .then((res) => new Uint8Array(res)),
        zKeyURI: circuits.zKeyURI,
        zKeyHash: circuits.zKeyHash,
        vKeyData: await fetch(circuits.vKeyURI)
          .then((res) => res.arrayBuffer())
          .then((res) => new Uint8Array(res)),
        vKeyURI: circuits.vKeyURI,
        vKeyHash: circuits.vKeyHash,
        wasmData: await fetch(circuits.wasmURI)
          .then((res) => res.arrayBuffer())
          .then((res) => new Uint8Array(res)),
        wasmURI: circuits.wasmURI,
        wasmHash: circuits.wasmHash,
      }
      return postMessage({ result: circuitsData } as IWorkerResponse)
    } catch (error) {
      return postMessage({ error } as IWorkerResponse)
    }
  })
}
