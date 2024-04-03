export const createWebWorker = (worker: any) => {
  const code = worker.toString()
  const blob = new Blob(['(' + code + ')()'])
  const url =
    typeof window === 'undefined' ? import.meta.url : (window as any).MockedWindowURL || window.URL || window.webkitURL
  const blobURL = url.createObjectURL(blob)
  return new Worker(blobURL)
}
