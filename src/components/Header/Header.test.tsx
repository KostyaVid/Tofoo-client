import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store';

describe('Component <Header>', () => {
  test('Render logo on header', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
