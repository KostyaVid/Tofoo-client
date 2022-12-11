import React from 'react';
import { render, screen } from '@testing-library/react';
import MainContainer from './MainContainer';

describe('Component <MainContainer>', () => {
  test('Render title', async () => {
    render(<MainContainer title="Form">'children contain'</MainContainer>);
    expect(screen.getByRole('heading')).toHaveTextContent('Form');
  });
  test('Render error instead title if error exists', async () => {
    render(
      <MainContainer title="Form" serverError="error">
        'children contain'
      </MainContainer>,
    );
    expect(screen.getByRole('heading')).not.toHaveTextContent('Form');
    expect(screen.getByRole('heading')).toHaveTextContent('error');
  });
});
