import React, { useEffect } from 'react';
import { useServerErrorForms } from '../../hooks';
import MainContainer from '../../components/Form/MainContainer/MainContainer';
import Label from '../../components/LinkLabel/LinkLabel';
import s from './Projects.module.scss';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { useGetProjectsQuery } from '../../store/slices/rtkApi';

const Projects = () => {
  const [serverError, setServerError] = useServerErrorForms();
  const { data, isSuccess, isLoading, isError } = useGetProjectsQuery();

  useEffect(() => {
    if (isError) setServerError('Error');
  }, [isError, setServerError]);

  return (
    <div className={'container ' + s.container}>
      <MainContainer title="Projects" serverError={serverError}>
        <ButtonLink className={s.createButton} href="/projects/create">
          <svg className={s.createSVG} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </ButtonLink>
        {isSuccess && (
          <div className={s.projects}>
            {data.map((project) => (
              <Label key={project.project_id} href={`/projects/${project.project_id}`}>
                {`Name: ${project.name}. Create date: ${new Date(
                  project.create_date,
                ).toLocaleDateString()}. Deadline: ${project.end_date}`}
              </Label>
            ))}
          </div>
        )}
        {isLoading && <h2>Loading...</h2>}
      </MainContainer>
    </div>
  );
};

export default Projects;
