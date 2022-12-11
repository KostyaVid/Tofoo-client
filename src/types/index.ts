export type Status = 0 | 1 | 2;
export type StatusTodo = 0 | 1 | 2 | 3;

export interface IUser {
  user_id: number;
  username: string;
  email: string;
  project_id?: number | null;
  sprint_id?: number | null;
  company_id?: number | null;
  company_name?: string | null;
}

export interface IProject {
  project_id: number;
  name: string;
  status: Status;
  create_date: string;
  end_date: string;
  company_id: number;
}

export interface IHomeUser extends IUser {
  JWTToken?: string;
}

export type ScreenSize = 'sm' | 'md' | 'xl';
