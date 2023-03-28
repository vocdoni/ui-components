const evocdoni = process.env.VOCDONI_ENVIRONMENT || 'stg'
let explorer = 'https://explorer.vote'
if (['stg', 'dev'].includes(evocdoni)) {
  explorer = `https://${evocdoni}.explorer.vote`
}

export const ExplorerBaseURL = explorer
export const VocdoniEnvironment = evocdoni
