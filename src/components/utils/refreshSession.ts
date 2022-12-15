import { RootState } from './../../store/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logOut } from '../../store/slices/homeUserSlice';
import sendJWTTokenToServer from './sendJWTTokenToServer';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({ baseUrl: '/api/' });
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        let JWTToken: string | undefined | null = (api.getState() as RootState).homeUser.JWTToken;
        const refreshResult = await sendJWTTokenToServer(JWTToken);
        if (refreshResult) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem('JWTToken');
          api.dispatch(logOut());
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem('JWTToken');
        api.dispatch(logOut());
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
