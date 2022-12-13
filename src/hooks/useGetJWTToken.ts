import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '.';
import fetchError from '../components/utils/fetchError';
import { setUser } from '../store/slices/homeUserSlice';
import { IUser } from '../types';

export const useGetJWTToken = (
  path: string,
  setServerError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    async (values: Record<string, string>) => {
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.status !== 200) {
        setServerError(await fetchError(res));
        return;
      }

      const data: { user?: IUser; JWTToken?: string } = await res.json();
      if (data?.JWTToken && data?.user) {
        localStorage.setItem('JWTToken', data.JWTToken);
        dispatch(setUser({ ...data.user, JWTToken: data.JWTToken }));
        if (location.state?.redirectName) {
          const path = location.state.redirectName;
          location.state.redirectName = null;
          navigate(path);
        }

        navigate('/');
      }
    },
    [dispatch, navigate, location, path, setServerError],
  );
};
