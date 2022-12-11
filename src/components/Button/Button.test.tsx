import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import userEvent from '@testing-library/user-event';

describe('Component <Button>', () => {
  test('Render text on the button', () => {
    render(<Button>Text button</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Text button');
  });

  test('Button call handle click', () => {
    const mockCallback = jest.fn();
    render(<Button onClick={mockCallback}>Text button</Button>);
    userEvent.click(screen.getByRole('button'));
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
