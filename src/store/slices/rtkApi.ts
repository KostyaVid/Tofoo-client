import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../../utils/refreshSession";

export type Status = "Opened" | "In Progress" | "Done";
export type StatusTodo = Status | "Reviewer" | "Reopened";

export type Project = {
  project_id: number;
  name: string;
  status: Status;
  create_date: string;
  end_date: string;
};
type ProjectsResponse = Project[];

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Projects", "Sprints", "ToDos", "Users"],
  endpoints: (build) => ({
    getProjects: build.query<ProjectsResponse, void>({
      query: () => "projects",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ project_id }) => ({ type: "Projects", project_id } as const)
              ),
              { type: "Projects", id: "LIST" },
            ]
          : [{ type: "Projects", id: "LIST" }],
    }),
    getProject: build.query<Project, number>({
      query: (id) => ({ url: `projects/${id}` }),
      providesTags: (result, error, id) => [
        { type: "Projects", project_id: id },
      ],
    }),
    addProject: build.mutation<Project, Partial<Project>>({
      query(body) {
        return {
          url: "projects",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
} = api;
