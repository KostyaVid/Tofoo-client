import { useScreenSize } from "./useScreenSize";
import { useGetJWTToken } from "./useGetJWTToken";
import { useFetchAuth } from "./useFetchAuth";
import { useServerErrorForms } from "./useServerErrorForm";
import { useHomeUser } from "./useHomeUser";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./../store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useScreenSize, useGetJWTToken, useServerErrorForms, useHomeUser };
export { useFetchAuth };
