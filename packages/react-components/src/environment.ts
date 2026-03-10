export const environment = {
  explorer: (env: string) => {
    if (env === 'dev') {
      return 'https://dev.explorer.vote'
    }

    return 'https://explorer.vote'
  },
  verifyVote: (env: string, proof: string) => `${environment.explorer(env)}/verify/#/${proof}`,
}
