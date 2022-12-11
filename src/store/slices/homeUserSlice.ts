import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHomeUser } from '../../types';

const initialState: IHomeUser = {
  user_id: -1,
  username: '',
  email: '',
};

export const homeUserSlice = createSlice({
  name: 'homeUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IHomeUser>) => {
      return action.payload;
    },
    setJWTToken: (state, action: PayloadAction<string>) => {
      state.JWTToken = action.payload;
    },
    logOut: (state) => {
      return initialState;
    },
    setCompany: (
      state,
      action: PayloadAction<{ company_id: number | null; company_name: string | null }>,
    ) => {
      return {
        ...state,
        company_id: action.payload.company_id,
        company_name: action.payload.company_name,
      };
    },
  },
});

const { actions, reducer } = homeUserSlice;
export const { setUser, setCompany, logOut, setJWTToken } = actions;

export default reducer;
