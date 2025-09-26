import type { RecursivePartial } from '@vocdoni/react-providers'

export const locales = {
  // actions component
  actions: {
    cancel_description: 'canceling the "{{ election.title.default }}" election process',
    cancel:
      'Cancel the process immediately, not allowing new votes and not counting any results (caution: it cannot be reverted)',
    cancel_button: 'Cancel',
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
    cancel_process_button: 'Cancel process',
    cancel_process_title: 'Confirm cancelation',
    end_process_title: 'Confirm ending',
    end_process_button: 'End process',
  },
  empty: 'Apparently this process has no questions 🤔',
  envelopes: {
    envelope_abstain_count: 'Abstained {{ count }} times',
    question_title: 'Option/s selected in "{{ title }}":',
    error_processing_envelope: 'Cannot process envelope data for question "{{ title }}"',
  },
  errors: {
    wrong_data_title: 'Wrong data',
    wrong_data_description: 'The specified data is not correct',
    not_voted_in_ended_election: "You did not vote in this election and it's already finished",
  },
  loading: 'Loading...',
  pagination: {
    page_placeholder: 'Page #',
    total_results: 'Showing a total of {{ count }} results',
  },
  question_types: {
    approval_tooltip:
      "Approval voting lets you vote for as many options as you like. The one with the most votes wins. It's a simple way to show your support for all the choices you approve of.",
    approval_title: 'Approval Voting',
    singlechoice_title: 'Single Choice {{ weighted }}',
    multichoice_tooltip:
      'Multichoice voting lets you vote for up to {{maxcount}} options (defined by the voting organizer). The one with the most votes wins.',
    multichoice_title: 'Multichoice Voting {{ weighted }}',
    multichoice_desc: 'You selected {{selected}} options (max {{maxcount}})',
    multichoice_desc_abstain: ' (or abstain)',
    multichoice_cannot_abstain: 'Too many options selected',
    weighted_voting: 'Weighted Voting',
  },
  schedule: {
    from_begin_to_end: 'Voting from {{ begin }} to {{ end }}',
    ended: 'Ended {{ distance }}',
    paused_start: '(Paused) Starts {{ distance }}',
    paused_end: '(Paused) Ends {{ distance }}',
    created: 'Created {{ distance }}',
  },
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
    at_least_one: 'You must select at least one option',
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
    weight: 'Your voting power is: ',
  },
}

export type Locale = RecursivePartial<typeof locales>
