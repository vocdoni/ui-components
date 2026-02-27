# React-Providers i18next Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the custom i18n implementation with i18next + react-i18next using namespace `react-providers`, keeping the public API stable and requiring app-level providers.

**Architecture:** `useLocalize` becomes a wrapper around `useTranslation('react-providers')`. The library no longer provides a default provider in production; consumers must provide `I18nextProvider`. Tests will wrap with a local i18next instance. Date-fns locale remains separate via a lightweight context if needed.

**Tech Stack:** i18next, react-i18next, React, Jest, Testing Library.

---

## Task 1: Add i18n peer + dev dependencies

**Files:**
- Modify: `packages/react-providers/package.json`

**Step 1: Write the failing test**
- Not applicable (dependency change only).

**Step 2: Run test to verify it fails**
- Skip.

**Step 3: Write minimal implementation**
Add to `peerDependencies`:
- `i18next`: `^23.0.0`
- `react-i18next`: `^14.0.0`

Add to `devDependencies`:
- `i18next`: `^23.0.0`
- `react-i18next`: `^14.0.0`

**Step 4: Run test to verify it passes**
- Skip.

**Step 5: Commit**
```bash
git add packages/react-providers/package.json

git commit -m "chore(react-providers): add i18next peer deps"
```

---

## Task 2: Rewrite i18n module to use i18next namespace `react-providers`

**Files:**
- Modify: `packages/react-providers/src/i18n/localize.tsx`
- Modify: `packages/react-providers/src/i18n/locales.ts`
- Modify: `packages/react-providers/src/i18n/index.ts`
- Modify: `packages/react-providers/src/client/ClientProvider.tsx`
- Create: `packages/react-providers/src/i18n/localize.test.tsx`

**Step 1: Write the failing test**
```ts
it('useLocalize uses i18next namespace', () => {
  const wrapper = createI18nWrapper()
  const { result } = renderHook(() => useLocalize(), { wrapper })
  expect(result.current('errors.unauthorized')).toBe('Not authorized to vote')
})
```

**Step 2: Run test to verify it fails**
Run: `pnpm test packages/react-providers/src/i18n/localize.test.tsx`
Expected: FAIL (useTranslation not wired)

**Step 3: Write minimal implementation**
- Replace custom context with `useTranslation('react-providers')`:
```ts
import { useTranslation } from 'react-i18next'

const useLocalize = () => {
  const { t } = useTranslation('react-providers')
  return (key: string, substitutions?: Record<string, unknown>) => t(key, substitutions)
}
```
- Keep `useDatesLocale` via a lightweight context provider if needed.
- Update `locales.ts` to export resources shaped for i18next:
```ts
export const reactProvidersResources = {
  en: {
    'react-providers': {
      errors: { unauthorized: 'Not authorized to vote' },
    },
  },
}
```
- Remove `LocaleProvider` usage inside `ClientProvider` (app-level provider required).

**Step 4: Run test to verify it passes**
Run: `pnpm test packages/react-providers/src/i18n/localize.test.tsx`
Expected: PASS

**Step 5: Commit**
```bash
git add packages/react-providers/src/i18n packages/react-providers/src/client/ClientProvider.tsx packages/react-providers/src/i18n/localize.test.tsx

git commit -m "refactor(react-providers): migrate i18n to i18next"
```

---

## Task 3: Update test utilities for i18next

**Files:**
- Modify: `packages/react-providers/src/test-utils.ts`
- Modify: tests that call `useLocalize`

**Step 1: Write the failing test**
- Use the test from Task 2.

**Step 2: Run test to verify it fails**
- Already fails until wrapper is added.

**Step 3: Write minimal implementation**
Add `createI18nWrapper` helper using an in-memory i18next instance:
```ts
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { reactProvidersResources } from './i18n/locales'

export const createI18nWrapper = () => {
  const instance = i18n.createInstance()
  instance.use(initReactI18next).init({
    lng: 'en',
    resources: reactProvidersResources,
    defaultNS: 'react-providers',
  })

  return ({ children }: { children: React.ReactNode }) => (
    <I18nextProvider i18n={instance}>{children}</I18nextProvider>
  )
}
```

**Step 4: Run test to verify it passes**
Run: `pnpm test packages/react-providers/src/i18n/localize.test.tsx`
Expected: PASS

**Step 5: Commit**
```bash
git add packages/react-providers/src/test-utils.ts

git commit -m "test(react-providers): add i18next test wrapper"
```

---

## Verification

After Task 3:
- Run: `pnpm test`
- Expected: all tests pass

---

## Notes / Constraints

- Namespace must be `react-providers`.
- App-level `I18nextProvider` is required; library should not auto-provide it.
- Keep public API stable (`useLocalize`, `useDatesLocale`, `LocaleProvider` if retained as a thin wrapper).
