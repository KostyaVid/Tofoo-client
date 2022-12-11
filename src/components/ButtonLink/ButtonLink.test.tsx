import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonLink from './ButtonLink';
import { BrowserRouter } from 'react-router-dom';

describe('Component <ButtonLink>', () => {
  test('Render text on the buttonLink', () => {
    render(<ButtonLink href="#">Text link</ButtonLink>, { wrapper: BrowserRouter });
    expect(screen.getByRole('link')).toHaveTextContent('Text link');
  });
});
