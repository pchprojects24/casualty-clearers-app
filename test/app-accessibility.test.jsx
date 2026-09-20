import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App.jsx';

beforeEach(() => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() });
  window.scrollTo = vi.fn();
  window.localStorage.clear();
  window.history.replaceState(null, '', '#/home');
});

afterEach(() => { document.body.innerHTML = ''; vi.restoreAllMocks(); });

describe('route recovery and mobile drawer', () => {
  it('renders a controlled fallback for an unsafe direct topic ID and updates the title', async () => {
    render(<App />);
    window.history.replaceState(window.history.state, '', '#/topic/__proto__');
    fireEvent.popState(window);
    expect(await screen.findByRole('heading', { name: 'Topic not found' })).toBeTruthy();
    await waitFor(() => expect(document.title).toBe('Page not found — CCT Info Hub'));
  });

  it('contains the mobile drawer and restores focus to its trigger', async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByLabelText('Open navigation');
    await user.click(trigger);
    const close = await screen.findByLabelText('Close navigation');
    await waitFor(() => expect(document.activeElement).toBe(close));
    expect(document.querySelector('.drawer-backdrop')).toBeTruthy();
    expect(document.querySelector('.app-shell > div[aria-hidden="true"]')).toBeTruthy();
    await user.click(close);
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
