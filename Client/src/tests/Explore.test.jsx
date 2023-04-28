import { render, screen } from '@testing-library/react';
import App from '../App.jsx';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

describe('Explore', () => {
  test('clicking on explore from <App /> should navigate to explore page', async () => {
    render(<App />)
    const exploreButton = screen.getByRole('button', { name: 'Explore' });
    await userEvent.click(exploreButton);
    expect(window.location.pathname).toBe('/explore')
  });


});
