import { useEffect } from "react";
import { useAppDispatch } from ".";
import { setScreenSize } from "../store/slices/screenSizeSlice";

export const useScreenSize = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const smWmq = window.matchMedia("(max-width: 768px)");
    const mdWmq = window.matchMedia("(max-width: 992px)");
    const changeEventSM = (event: MediaQueryListEvent) =>
      dispatch(setScreenSize(event.matches ? "sm" : "md"));

    const changeEventMD = (event: MediaQueryListEvent) =>
      dispatch(setScreenSize(event.matches ? "md" : "xl"));

    smWmq.addEventListener("change", changeEventSM);
    mdWmq.addEventListener("change", changeEventMD);

    return () => {
      smWmq.removeEventListener("change", changeEventSM);
      mdWmq.removeEventListener("change", changeEventMD);
    };
  }, [dispatch]);
};
