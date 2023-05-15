export default {
  en: {
    // actions component
    actions: {
      pause: 'Pause',
      continue: 'Continue',
      cancel: 'Cancel',
      cancel_description: 'cancelling the "{{ election.title.default }}" election process',
      continue_description: 'continuing the "{{ election.title.default }}" election process',
      error_title: 'There was some error while executing the transaction',
      pause_description: 'pausing the "{{ election.title.default }}" election process',
      waiting_title: 'Waiting for transaction confirmation...',
    },
    vote: {
      button: 'Vote',
      button_update: 'Re-submit vote',
    },
    empty: 'Apparently this process has no questions 🤔',
    required: 'This field is required',
    voted:
      'Your vote was successfully cast! Your vote id is <a href="{{ link }}" target="_blank" rel="noreferrer noopener">{{ id }}</a>',
    // results component
    results: {
      secret_until_the_end:
        'Secret until the end. The results will be available when the process ends at {{ endDate }}',
      date_format: 'd-L-y HH:mm',
      title: 'Results for "{{title}}"',
      votes: 'Votes: {{votes}} ({{percent}})',
    },
    // status badge
    statuses: {
      CANCELED: 'Canceled',
      ENDED: 'Ended',
      ONGOING: 'Ongoing',
      PAUSED: 'Paused',
      RESULTS: 'Results',
      UPCOMING: 'Upcoming',
      PROCESS_UNKNOWN: 'Unknown',
    },
  },
}
