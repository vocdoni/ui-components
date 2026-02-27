# React-Providers React-Query Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate react-providers to React Query for remote state while keeping public hooks and API stable.

**Architecture:** React Query becomes the source of truth for remote data (account/election/organization/census/vote info). Public hooks adapt React Query state into the current shape. Any non-remote state remains local to hooks; only keep minimal internal reducers if absolutely necessary.

**Tech Stack:** React, @tanstack/react-query, @vocdoni/sdk, Jest, Testing Library.

---

## Task 1: Add React Query peer + dev dependency

**Files:**
- Modify: `packages/react-providers/package.json`

**Step 1: Write the failing test**
- Not applicable (dependency change only). Note in commit message.

**Step 2: Run test to verify it fails**
- Skip (no code change yet).

**Step 3: Write minimal implementation**
- Add to `peerDependencies`:
  - `@tanstack/react-query`: `^5.0.0`
- Add to `devDependencies`:
  - `@tanstack/react-query`: `^5.0.0`

**Step 4: Run test to verify it passes**
- Skip.

**Step 5: Commit**
```bash
git add packages/react-providers/package.json
git commit -m "chore(react-providers): add react-query peer dep"
```

---

## Task 2: Add query key helpers and test wrapper

**Files:**
- Create: `packages/react-providers/src/query/keys.ts`
- Modify: `packages/react-providers/src/index.ts`
- Modify: `packages/react-providers/src/test-utils.ts`
- Create: `packages/react-providers/src/query/keys.test.ts`

**Step 1: Write the failing test**
```ts
import { queryKeys } from '../query/keys'

test('queryKeys are stable', () => {
  expect(queryKeys.client.account('dev', '0xabc')).toEqual(['client', 'dev', '0xabc', 'account'])
})
```

**Step 2: Run test to verify it fails**
Run: `pnpm test packages/react-providers/src/query/keys.test.ts`
Expected: FAIL (module not found)

**Step 3: Write minimal implementation**
```ts
// packages/react-providers/src/query/keys.ts
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
```
Add export in `packages/react-providers/src/index.ts`:
```ts
export * from './query/keys'
```
Add a test wrapper to `packages/react-providers/src/test-utils.ts`:
```ts
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const createQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

**Step 4: Run test to verify it passes**
Run: `pnpm test packages/react-providers/src/query/keys.test.ts`
Expected: PASS

**Step 5: Commit**
```bash
git add packages/react-providers/src/query/keys.ts packages/react-providers/src/index.ts packages/react-providers/src/test-utils.ts packages/react-providers/src/query/keys.test.ts
git commit -m "feat(react-providers): add react-query keys and test wrapper"
```

---

## Task 3: Rewrite `useClientProvider` to React Query

**Files:**
- Modify: `packages/react-providers/src/client/use-client-provider.ts`
- Modify: `packages/react-providers/src/client/ClientProvider.tsx`
- Modify: `packages/react-providers/src/client/ClientProvider.test.tsx`
- Modify: `packages/react-providers/src/client/use-client-reducer.test.tsx` (repurpose to invariant tests)
- Modify: `packages/react-providers/src/client/index.ts`

**Step 1: Write the failing test**
Add a react-query backed test that asserts the invariant shape:
```ts
it('fetchAccount populates account via react-query', async () => {
  const wrapper = createQueryWrapper()
  const { result } = renderHook(() => useClient(), { wrapper: ({ children }) => <ClientProvider>{wrapper({ children })}</ClientProvider> })

  await act(async () => {
    await result.current.fetchAccount()
  })

  await waitFor(() => expect(result.current.account).toBeDefined())
  expect(result.current.errors.fetch).toBeNull()
})
```

**Step 2: Run test to verify it fails**
Run: `pnpm test packages/react-providers/src/client/ClientProvider.test.tsx`
Expected: FAIL (no QueryClientProvider or stale reducer behavior)

**Step 3: Write minimal implementation**
- Replace reducer usage with React Query primitives:
  - `useQuery` for account fetch (enabled when `connected` and `wallet` exist)
  - `useMutation` for create/update
  - `fetchAccount` calls `refetch`
- Keep local state for `env`, `signer`, `client` (useState + useMemo)
- Preserve shape fields: `loading`, `loaded`, `errors` by mapping query/mutation state
- `clear()` should:
  - remove account query cache via `queryClient.removeQueries({ queryKey })`
  - reset `signer`/`client` state and `connected`
- Update `ClientProvider` to not depend on reducers

**Step 4: Run test to verify it passes**
Run: `pnpm test packages/react-providers/src/client/ClientProvider.test.tsx`
Expected: PASS

**Step 5: Commit**
```bash
git add packages/react-providers/src/client/use-client-provider.ts packages/react-providers/src/client/ClientProvider.tsx packages/react-providers/src/client/ClientProvider.test.tsx

git commit -m "refactor(react-providers): client hook on react-query"
```

---

## Task 4: Rewrite `useOrganizationProvider` to React Query

**Files:**
- Modify: `packages/react-providers/src/organization/use-organization-provider.ts`
- Modify: `packages/react-providers/src/organization/OrganizationProvider.test.tsx`
- Modify: `packages/react-providers/src/organization/use-organization-reducer.test.tsx` (repurpose to invariant tests)

**Step 1: Write the failing test**
```ts
it('fetches organization via react-query', async () => {
  const wrapper = createQueryWrapper()
  const { result } = renderHook(() => useOrganization(), {
    wrapper: ({ children }) => <OrganizationProvider>{wrapper({ children })}</OrganizationProvider>,
  })
  await act(async () => result.current.fetch('0x123'))
  await waitFor(() => expect(result.current.organization).toBeDefined())
})
```

**Step 2: Run test to verify it fails**
Run: `pnpm test packages/react-providers/src/organization/OrganizationProvider.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**
- Replace reducer with:
  - `useQuery` for organization (key: `queryKeys.organization.byId(id)`)
  - `useMutation` for update, calling `queryClient.setQueryData`
- Keep `loaded/loading/errors` shape derived from query state

**Step 4: Run test to verify it passes**
Run: `pnpm test packages/react-providers/src/organization/OrganizationProvider.test.tsx`
Expected: PASS

**Step 5: Commit**
```bash
git add packages/react-providers/src/organization/use-organization-provider.ts packages/react-providers/src/organization/OrganizationProvider.test.tsx

git commit -m "refactor(react-providers): organization hook on react-query"
```

---

## Task 5: Rewrite `useElectionProvider` to React Query

**Files:**
- Modify: `packages/react-providers/src/election/use-election-provider.ts`
- Modify: `packages/react-providers/src/election/ElectionProvider.test.tsx`
- Modify: `packages/react-providers/src/election/use-election-reducer.test.tsx` (repurpose to invariant tests)

**Step 1: Write the failing test**
Add a test that asserts react-query-backed election load + census logic:
```ts
it('loads election via react-query and computes participation', async () => {
  const wrapper = createQueryWrapper()
  const { result } = renderHook(() => useElection(), {
    wrapper: ({ children }) => <ElectionProvider>{wrapper({ children })}</ElectionProvider>,
  })

  await waitFor(() => expect(result.current.loaded.election).toBeTruthy())
  expect(result.current.participation).toBeGreaterThanOrEqual(0)
})
```

**Step 2: Run test to verify it fails**
Run: `pnpm test packages/react-providers/src/election/ElectionProvider.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**
- Replace reducer with:
  - `useQuery` for election data by `id`
  - `useQuery` for census state (enabled with `fetchCensus`)
  - `useMutation` for vote/csp flows
- Keep local state for:
  - `vote` draft
  - `csp.token` (persist to localStorage on success)
  - `sik` inputs
- Ensure `votesLeft` never drops below 0
- Derive `participation` and `turnout` from election data
- Keep existing public API shape for `useElection` hook

**Step 4: Run test to verify it passes**
Run: `pnpm test packages/react-providers/src/election/ElectionProvider.test.tsx`
Expected: PASS

**Step 5: Commit**
```bash
git add packages/react-providers/src/election/use-election-provider.ts packages/react-providers/src/election/ElectionProvider.test.tsx

git commit -m "refactor(react-providers): election hook on react-query"
```

---

## Task 6: Remove reducer plumbing (only if unused)

**Files:**
- Modify or remove: `packages/react-providers/src/client/use-client-reducer.ts`
- Modify or remove: `packages/react-providers/src/organization/use-organization-reducer.tsx`
- Modify or remove: `packages/react-providers/src/election/use-election-reducer.ts`
- Modify: `packages/react-providers/src/client/index.ts`
- Modify: `packages/react-providers/src/organization/index.ts`
- Modify: `packages/react-providers/src/election/index.ts`

**Step 1: Write the failing test**
- Not applicable (cleanup).

**Step 2: Run test to verify it fails**
- Skip.

**Step 3: Write minimal implementation**
- Remove reducer exports if no longer referenced.
- If any reducer is still needed for a tiny state machine, keep a minimal local reducer inside its hook and delete the exported reducer module.

**Step 4: Run test to verify it passes**
Run: `pnpm test`
Expected: PASS

**Step 5: Commit**
```bash
git add packages/react-providers/src/client packages/react-providers/src/organization packages/react-providers/src/election

git commit -m "chore(react-providers): remove unused reducers"
```

---

## Verification

After Task 6:
- Run: `pnpm test`
- Expected: all tests pass

---

## Notes / Constraints

- Keep public hook APIs stable (`useClient`, `useElection`, `useOrganization`).
- React Query provider is required at app level; only tests should wrap providers.
- If any state machine cannot be expressed cleanly in React Query, allow a minimal local reducer inside that hook only (do not export it).
