export const locales = {
  // actions component
  actions: {
    cancel_description: 'canceling the "{{ election.title.default }}" election process',
    cancel:
      'Cancel the process immediately, not allowing new votes and not counting any results (caution: it cannot be reverted)',
    continue_description: 'resuming the "{{ election.title.default }}" election process',
    continue: 'Resume the process immediately, in case it has been paused',
    end_description: 'ending the "{{ election.title.default }}" election process',
    end: 'End the process immediately, preventing new votes to be submitted, and shows the voting results (caution: it cannot be reverted)',
    error_title: 'There was some error while executing the transaction',
    pause_description: 'pausing the "{{ election.title.default }}" election process',
    pause:
      'Pause the voting process temporarily, until resumed manually. While the process is paused, voters cannot submit votes.',
    waiting_title: 'Waiting for transaction confirmation...',
  },
  // questions and vote button
  vote: {
    button_update: 'Re-submit vote',
    button: 'Vote',
    voted_description: 'Your vote id is {{ id }}. You can use it to verify your vote.',
    voted_title: 'Your vote was successfully cast!',
  },
  empty: 'Apparently this process has no questions 🤔',
  required: 'This field is required',
  schedule: 'Voting from {{ begin }} to {{ end }}',
  // results component
  results: {
    date_format: 'd-L-y HH:mm',
    secret_until_the_end: 'Secret until the end. The results will be available when the process ends at {{ endDate }}',
    title: 'Results for "{{ title }}"',
    votes: 'Votes: {{ votes }} ({{ percent }})',
  },
  // status badge
  statuses: {
    canceled: 'Canceled',
    ended: 'Ended',
    ongoing: 'Ongoing',
    paused: 'Paused',
    results: 'Results',
    upcoming: 'Upcoming',
    process_unknown: 'Unknown',
    invalid: 'Invalid',
  },
  errors: {
    unauthorized: 'Not authorized to vote',
  },
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

export type Locale = RecursivePartial<typeof locales>
