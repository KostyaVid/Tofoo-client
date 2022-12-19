import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  user_id: number;
  username: string;
  email: string;
  project_id?: number | null;
  sprint_id?: number | null;
  company_id?: number | null;
  company_name?: string | null;
};

export type HomeUser = User & {
  JWTToken?: string;
};
type RequestState = "pending" | "fulfilled" | "rejected";

const initialState: {
  homeUser: HomeUser;
  status?: RequestState;
} = {
  homeUser: { user_id: -1, username: "", email: "" },
};

export const setHomeUser = createAsyncThunk<User, null>(
  "homeUser/setHomeUser",
  async (_, thunkAPI) => {
    let JWTToken: string | undefined | null;
    if ((thunkAPI.getState() as RootState).homeUser.homeUser.JWTToken) {
      JWTToken = (thunkAPI.getState() as RootState).homeUser.homeUser.JWTToken;
    } else {
      JWTToken = localStorage.getItem("JWTToken");
    }
    if (JWTToken) {
      const resAuth = await fetch("/api/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWTToken}`,
        },
      });
      if (resAuth.status === 200) {
        const { user } = await resAuth.json();
        return user;
      }
      return thunkAPI.rejectWithValue(`Status: ${resAuth.statusText}`);
    }
    return thunkAPI.rejectWithValue("Have not a token");
  }
);

export const homeUserSlice = createSlice({
  name: "homeUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<HomeUser>) => {
      state.homeUser = action.payload;
      state.status = "fulfilled";
    },
    setJWTToken: (state, action: PayloadAction<string>) => {
      state.homeUser.JWTToken = action.payload;
    },
    logOut: (state) => {
      return initialState;
    },
    setCompany: (
      state,
      action: PayloadAction<{
        company_id: number;
        company_name: string;
      }>
    ) => {
      state.homeUser.company_id = action.payload.company_id;
      state.homeUser.company_name = action.payload.company_name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setHomeUser.fulfilled, (state, action) => {
      state.homeUser = action.payload;
      state.status = "fulfilled";
    });
    builder.addCase(setHomeUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(setHomeUser.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const selectStatus = (state: RootState) => state.homeUser.status;
export const selectData = (state: RootState) => state.homeUser;

const { actions, reducer } = homeUserSlice;
export const { setUser, setCompany, logOut, setJWTToken } = actions;

export default reducer;
