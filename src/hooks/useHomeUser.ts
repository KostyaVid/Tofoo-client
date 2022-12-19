import { useSelector } from "react-redux";
import { useAppDispatch } from ".";
import {
  selectData,
  selectStatus,
  setHomeUser,
} from "../store/slices/homeUserSlice";
import { useEffect } from "react";
import { RootState } from "../store/store";

export function useHomeUser() {
  const dispatch = useAppDispatch();

  const status = useSelector((state: RootState) => selectStatus(state));

  const data = useSelector((state: RootState) => selectData(state));
  useEffect(() => {
    if (status === undefined) {
      dispatch(setHomeUser(null));
    }
  }, [status, dispatch]);

  const isUninitialized = status === undefined;
  const isLoading = status === "pending" || status === undefined;
  const isError = status === "rejected";
  const isSuccess = status === "fulfilled";

  // return the import data for the caller of the hook to use
  return { data, isUninitialized, isLoading, isError, isSuccess };
}
