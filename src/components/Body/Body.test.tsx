import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Body from './Body';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Work router', () => {
  test('Using button back', async () => {
    const route = '/login';
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByRole('heading').textContent).toMatch('LOGIN');
    await userEvent.click(screen.getByText(/Back to SignUp/i));
    expect(screen.getByRole('heading').textContent).toMatch('SIGNUP');
    await userEvent.click(screen.getByTestId('buttonBackHistory'));
    expect(screen.getByRole('heading').textContent).toMatch('LOGIN');
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Companies')).not.toBeInTheDocument();
    expect(screen.queryByText('Projects')).not.toBeInTheDocument();
    expect(screen.queryByText('Sprints')).not.toBeInTheDocument();
    expect(screen.queryByText('todos')).not.toBeInTheDocument();
  });
  test('Should go to /login', () => {
    const route = '/';
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Body />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByRole('heading').textContent).toMatch('LOGIN');
  });
  test('Should go to /signup', async () => {
    const route = '/';
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Body />
        </MemoryRouter>
      </Provider>,
    );
    await userEvent.click(screen.getByText('Back to SignUp'));
    expect(screen.getByRole('heading').textContent).toMatch('SIGNUP');
  });

  test('Should go to /company and should suppose Create new company', async () => {
    const route = '/';
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Body />
        </MemoryRouter>
      </Provider>,
    );
    await userEvent.type(screen.getByLabelText(/email/i), 'john@gmail.com');
    await userEvent.type(screen.getByLabelText(/password/i), '1234');
    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('heading').textContent).toMatch('Create new company');
    });
  });

  test('Should go to /company', async () => {
    const route = '/';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Body />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByRole('heading').textContent).toMatch('Create new company');
  });

  test('Should go to /', async () => {
    const route = '/';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Body />
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.type(screen.getByLabelText(/Company/i), 'my test company');
    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('heading').textContent).toMatch('Home');
    });
  });

  test('In the Header render Links', async () => {
    const route = '/';
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Companies')).toBeInTheDocument();
  });
  test('Should go to / with company', async () => {
    const route = '/';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Body />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByRole('heading').textContent).toMatch('Home');
  });

  test('Should leave company', async () => {
    const route = '/company';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Body />
        </MemoryRouter>
      </Provider>,
    );
    await userEvent.click(screen.getByText(/Leave company/i));
    await waitFor(() => {
      expect(screen.getByRole('heading').textContent).toMatch('Create new company');
    });
  });
});
