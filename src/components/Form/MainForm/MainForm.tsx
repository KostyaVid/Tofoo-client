import { Form, Formik } from 'formik';
import React, { ReactNode } from 'react';
import Button from '../../Button/Button';
import ButtonLink from '../../ButtonLink/ButtonLink';
import MainContainer from '../MainContainer/MainContainer';
import s from './MainForm.module.scss';

interface IMainForm {
  title: string;
  serverError: string | null;
  handleSubmit: (values: Record<string, string>) => Promise<void>;
  SignupSchema: any;
  initialValues: Record<string, string> & Record<string, string | number | Date | undefined>;
  children: ReactNode;
  submitButtonName: string;
  backLinkName?: string;
  backLinkHref?: string;
  disableSubmit?: boolean;
}

const MainForm = ({
  title,
  serverError,
  handleSubmit,
  SignupSchema,
  initialValues,
  children,
  submitButtonName,
  backLinkName,
  backLinkHref,
  disableSubmit,
}: IMainForm) => {
  return (
    <MainContainer title={title} serverError={serverError}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignupSchema}>
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.formContainer}>{children}</div>
            <div className={s.buttons}>
              {backLinkHref && (
                <ButtonLink href={backLinkHref}>
                  <svg
                    className={s.backImg}
                    aria-hidden
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path d="M109.3 288L480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288z" />
                  </svg>
                  {backLinkName}
                </ButtonLink>
              )}
              <Button type="submit" disabled={isSubmitting || disableSubmit}>
                {submitButtonName}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </MainContainer>
  );
};

export default MainForm;
