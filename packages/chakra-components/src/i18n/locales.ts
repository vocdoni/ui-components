import type { RecursivePartial } from '@vocdoni/react-providers'

export const locales = {
  // actions component
  actions: {
    cancel_description: 'canceling the "{{ election.title.default }}" election process',
    cancel:
      'Cancel the process immediately, not allowing new votes and not counting any results (caution: it cannot be reverted)',
    cancel_cta: 'Cancel',
    confirm: 'Confirm',
    confirm_cancel_cta: 'Cancel process',
    confirm_cancel_title: 'Confirm cancelation',
    confirm_end_cta: 'End process',
    confirm_end_title: 'Confirm ending',
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
  balance: '{{ balance }} VOC tokens',
  confirm: {
    title: 'Confirm',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  empty: 'Apparently this process has no questions 🤔',
  errors: {
    wrong_data_title: 'Wrong data',
    wrong_data_description: 'The specified data is not correct',
    not_voted_in_ended_election: "You did not vote in this election and it's already finished",
  },
  loading: 'Loading...',
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
  spreadsheet: {
    access_button: 'Identify',
    anon_sik_label: 'Define a password for your vote',
    anon_sik_helper: 'This ensures the vote to be anonymous',
    close: 'Close',
    logout: 'Logout',
    modal_title: 'You must identify first',
  },
  validation: {
    required: 'This field is required',
    min_length: 'This field must be at least {{ min }} characters long',
    choices_count: 'Select {{ count }} choices',
  },
  // questions and vote button
  vote: {
    abstain: 'Abstain',
    button_update: 'Re-submit vote',
    button: 'Vote',
    confirm: 'Please confirm your choices:',
    sign: 'Sign first',
    voted_description: 'Your vote id is {{ id }}. You can use it to verify your vote.',
    voted_title: 'Your vote was successfully cast!',
  },
}

export type Locale = RecursivePartial<typeof locales>
