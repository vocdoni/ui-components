export const queryKeys = {
  client: {
    account: (env: string, address: string) => ['client', env, address, 'account'] as const,
  },
  organization: {
    byId: (id: string) => ['organization', id] as const,
  },
  election: {
    byId: (id: string) => ['election', id] as const,
    census: (id: string, voter: string) => ['election', id, 'census', voter] as const,
    voteInfo: (id: string, voter: string) => ['election', id, 'vote-info', voter] as const,
  },
}
