import React from 'react';
import { render } from './test-utils/test-utils';


import App from './App';

test('renders the Birgitta Networks webpage', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Build your own networks/i);
  expect(headerElement).toBeInTheDocument();
});
