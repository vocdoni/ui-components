import { render } from '@src/test-utils';
import { screen } from '@testing-library/react';
import Home from './Home';

test('renders input label', () => {
  render(<Home />)
  const linkElement = screen.getByText(/Specify a process ID/i)
  expect(linkElement).toBeInTheDocument()
})
