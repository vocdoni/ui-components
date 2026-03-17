export const createWebWorker = (worker: any) => {
  if (typeof Worker === 'undefined' || typeof Blob === 'undefined' || typeof URL === 'undefined') {
    return null
  }

  const workerURL = (globalThis as any).MockedWindowURL || globalThis.URL
  if (typeof workerURL?.createObjectURL !== 'function') {
    return null
  }

  const code = worker.toString()
  const blob = new Blob(['(' + code + ')()'])
  const blobURL = workerURL.createObjectURL(blob)
  const instance = new Worker(blobURL)
  const terminate = instance.terminate?.bind(instance)

  instance.terminate = () => {
    terminate?.()
    workerURL.revokeObjectURL?.(blobURL)
  }

  return instance
}
