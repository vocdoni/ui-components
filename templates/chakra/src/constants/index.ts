const evocdoni = import.meta.env.VOCDONI_ENVIRONMENT
let explorer = 'https://explorer.vote'
if (['stg', 'dev'].includes(evocdoni)) {
  explorer = `https://${evocdoni}.explorer.vote`
}

export const ExplorerBaseURL = explorer
export const VocdoniEnvironment = evocdoni
