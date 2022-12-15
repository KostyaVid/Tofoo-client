import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '../../components/utils/refreshSession';
import { IProject } from '../../types';

type ProjectResponse = IProject[];

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Projects', 'Sprints', 'ToDos', 'Users'],
  endpoints: (build) => ({
    getProjects: build.query<ProjectResponse, void>({
      query: () => 'projects',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ project_id }) => ({ type: 'Projects', project_id } as const)),
              { type: 'Projects', id: 'LIST' },
            ]
          : [{ type: 'Projects', id: 'LIST' }],
    }),
    getProject: build.query<IProject, number>({
      query: (id) => ({ url: `projects/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Projects', project_id: id }],
    }),
    addProject: build.mutation<IProject, Partial<IProject>>({
      query(body) {
        return {
          url: 'projects',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectQuery, useAddProjectMutation } = api;
