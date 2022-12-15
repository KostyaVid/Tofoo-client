import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import MainContainer from '../../components/Form/MainContainer/MainContainer';
import { useServerErrorForms } from '../../hooks';
import { useGetProjectQuery } from '../../store/slices/rtkApi';
import s from './ProjectID.module.scss';

const ProjectID = () => {
  const [serverError, setServerError] = useServerErrorForms();
  const params = useParams();
  const { data, isError, isLoading, isSuccess } = useGetProjectQuery(Number(params.projectID));

  useEffect(() => {
    if (isError) setServerError('Error');
  }, [isError, setServerError]);

  return (
    <div className={'container ' + s.container}>
      <MainContainer title="Project" serverError={serverError}>
        {isSuccess && data && (
          <div className={s.card}>
            <h2>{'Name: ' + data.name}</h2>
            <div className={s.line}></div>
            <div>{'Create date: ' + new Date(data.create_date).toLocaleDateString()}</div>
            <div>{'Deadline: ' + new Date(data.end_date).toLocaleDateString()}</div>
          </div>
        )}
        {isLoading && <h2>Loading...</h2>}
      </MainContainer>
    </div>
  );
};

export default ProjectID;
