import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainForm from './MainForm';
import { Field } from 'formik';

describe('Component <MainForm>', () => {
  const props = {
    title: 'FORM',
    serverError: null,
    handleSubmit: jest.fn(),
    SignupSchema: null,
    initialValues: { name: '' },
    submitButtonName: 'submit',
  };
  test('Render title', async () => {
    render(
      <MainForm {...props}>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" placeholder="Jane" />
      </MainForm>,
    );
    expect(screen.getByRole('heading')).toHaveTextContent('FORM');
  });

  test('Button named from props', async () => {
    render(
      <MainForm {...props}>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" placeholder="Jane" />
      </MainForm>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('submit');
  });

  test('Submit with input text', async () => {
    render(
      <MainForm {...props}>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" placeholder="Jane" />
      </MainForm>,
    );

    await userEvent.type(screen.getByLabelText(/name/i), 'John');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(props.handleSubmit).toHaveBeenCalledWith({ name: 'John' }, expect.anything());
    });
  });
});
