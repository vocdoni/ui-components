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

export const fetchDataInChunks = async (url: string) => {
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((res) => new Uint8Array(res))
}

export default () => {
  self.addEventListener('message', async (e: MessageEvent<ICircuitWorkerRequest>) => {
    try {
      const { circuits } = e.data

      async function fetchDataInChunks(uri: string) {
        const response = await fetch(uri)
        const reader = response.body?.getReader() as ReadableStreamDefaultReader
        const contentLength = +(response.headers?.get('Content-Length') ?? 0)

        const chunks = []
        let receivedLength = 0

        while (true) {
          const { done, value } = await reader.read()

          if (done) break

          chunks.push(value)
          receivedLength += value.length

          // Check for content length, break if all content received
          if (contentLength && receivedLength >= contentLength) break
        }

        const concatenatedArray = new Uint8Array(receivedLength)
        let offset = 0

        for (const chunk of chunks) {
          concatenatedArray.set(chunk, offset)
          offset += chunk.length
        }

        return concatenatedArray
      }

      const [zKeyData, vKeyData, wasmData] = await Promise.all([
        fetchDataInChunks(circuits.zKeyURI),
        fetchDataInChunks(circuits.vKeyURI),
        fetchDataInChunks(circuits.wasmURI),
      ])

      const circuitsData: ICircuit = {
        zKeyData,
        zKeyURI: circuits.zKeyURI,
        zKeyHash: circuits.zKeyHash,
        vKeyData,
        vKeyURI: circuits.vKeyURI,
        vKeyHash: circuits.vKeyHash,
        wasmData,
        wasmURI: circuits.wasmURI,
        wasmHash: circuits.wasmHash,
      }
      return postMessage({ result: circuitsData } as IWorkerResponse)
    } catch (error) {
      return postMessage({ error } as IWorkerResponse)
    }
  })
}
