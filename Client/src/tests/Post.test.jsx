import { render, screen } from '@testing-library/react';
import App from '../App.jsx';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

describe('Post', () => {
  test('clicking on Post from <App /> should navigate to post page', async () => {
    render(<App />)
    const postButton = screen.getByRole('button', { name: 'Post' });
    await userEvent.click(postButton);
    expect(window.location.pathname).toBe('/post')
  });


});
