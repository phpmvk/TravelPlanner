import { render, screen } from '@testing-library/react';
import App from '../App.jsx';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

describe('Modify Trip', () => {
  it('clicking on Modify Trip from <App /> should navigate to modify page', async () => {
    render(<App />)
    const modifyTripButton = screen.getByRole('button', { name: 'Modify Trip' });
    await userEvent.click(modifyTripButton);
    expect(window.location.pathname).toBe('/modify')
  });

  it('users should be able to enter a userName to conduct search', async () => {
    render(<App />)
    // const modifyTripButton = screen.getByRole('button', { name: 'Modify Trip' });
    // await userEvent.click(modifyTripButton);
    
    //note that this test runs as if we were already on Modify Trip page. Why?
    const inputField = screen.getByRole('button', { name: 'Search' });
    expect(inputField).toBeInTheDocument();

  });

});
