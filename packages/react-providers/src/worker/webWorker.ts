import { Blob } from 'node:buffer'
import { URL } from 'node:url'

export const createWebWorker = (worker: any) => {
  const code = worker.toString()
  const blob = new Blob(['(' + code + ')()'])
  const blobURL = URL.createObjectURL(blob)
  return new Worker(blobURL)
}
