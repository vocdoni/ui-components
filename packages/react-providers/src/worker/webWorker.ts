export const createWebWorker = (worker: any) => {
  const code = worker.toString()
  const blob = new Blob(['(' + code + ')()'])
  const workerURL = (window as any).MockedWindowURL || window.URL || window.webkitURL
  const blobURL = workerURL.createObjectURL(blob)
  return new Worker(blobURL)
}
