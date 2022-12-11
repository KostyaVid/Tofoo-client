import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Component <Header>', () => {
  test('Render logo on header', () => {
    render(<Header />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
