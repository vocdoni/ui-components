import { queryKeys } from '../query/keys'

test('queryKeys are stable', () => {
  expect(queryKeys.client.account('dev', '0xabc')).toEqual(['client', 'dev', '0xabc', 'account'])
})
