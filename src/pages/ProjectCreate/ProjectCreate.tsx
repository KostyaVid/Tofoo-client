import React, { useEffect } from 'react';
import * as Yup from 'yup';
import Input from '../../components/Form/Input/Input';
import MainForm from '../../components/Form/MainForm/MainForm';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useAddProjectMutation } from '../../store/slices/rtkApi';
import s from './ProjectCreate.module.scss';
import { useServerErrorForms } from '../../hooks';
import { useNavigate } from 'react-router';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Too Short!').max(40, 'Too Long!').required('Required'),
  end_date: Yup.date().min(new Date(), 'Deadline should be in the future').required('Required'),
});

const ProjectCreate = () => {
  const [serverError, setServerError] = useServerErrorForms();
  const navigate = useNavigate();
  const [addProject, result] = useAddProjectMutation();

  useEffect(() => {
    if (result.error) setServerError((result.error as FetchBaseQueryError)?.status?.toString());
  }, [result.error, setServerError]);

  useEffect(() => {
    if (result.isSuccess) navigate(`/projects/${result.data.project_id}`);
  }, [result.isSuccess, result.data, navigate]);

  const handleSubmit = async (values: Record<string, string>) => {
    addProject(values);
  };
  return (
    <div className={'container ' + s.container}>
      <MainForm
        SignupSchema={SignupSchema}
        initialValues={{ name: '', end_date: '' }}
        serverError={serverError}
        handleSubmit={handleSubmit}
        title="Create project"
        submitButtonName="Create"
        disableSubmit={result.isLoading}>
        <Input
          name="name"
          type="text"
          labelName="Name"
          id="project_name"
          placeholder="name project..."
        />
        <Input name="end_date" type="date" labelName="Deadline" id="end_date" />
      </MainForm>
    </div>
  );
};

export default ProjectCreate;
