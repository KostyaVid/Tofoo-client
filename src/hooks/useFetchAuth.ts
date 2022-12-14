import { useAppSelector, useAppDispatch } from ".";
import { useLocation, useNavigate } from "react-router";
import { logOut } from "../store/slices/homeUserSlice";
import sendJWTTokenToServer from "../utils/sendJWTTokenToServer";

export const useFetchAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  let JWTToken: string | undefined | null = useAppSelector(
    (state) => state.homeUser.homeUser.JWTToken
  );

  return async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
    const res = await fetch(input, init);
    if (res.status === 401) {
      const isSuccess = await sendJWTTokenToServer(JWTToken);
      if (isSuccess) return await fetch(input, init);
      localStorage.removeItem("JWTToken");
      dispatch(logOut());
      navigate("/login", { state: { redirectName: location.pathname } });
    }
    return res;
  };
};
