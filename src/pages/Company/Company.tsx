import React from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";
import MainContainer from "../../components/Form/MainContainer/MainContainer";
import MainForm from "../../components/Form/MainForm/MainForm";
import fetchError from "../../utils/fetchError";
import sendJWTTokenToServer from "../../utils/sendJWTTokenToServer";
import {
  User,
  setCompany,
  setJWTToken,
  setUser,
} from "../../store/slices/homeUserSlice";
import {
  useAppDispatch,
  useAppSelector,
  useFetchAuth,
  useServerErrorForms,
} from "./../../hooks";
import s from "./Company.module.scss";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});

const Company = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchAuth = useFetchAuth();
  const [serverError, setServerError] = useServerErrorForms();
  const user = useAppSelector((state) => state.homeUser);

  const handleLeaveCompany = async () => {
    try {
      const res = await fetchAuth("/api/company/leave", {
        method: "PATCH",
      });

      if (res.status !== 200) return setServerError(await fetchError(res));

      const { JWTToken, user }: { JWTToken: string; user: User } =
        await res.json();
      dispatch(setUser({ ...user, JWTToken }));
      sendJWTTokenToServer(JWTToken);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error");
    }
  };

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      const res = await fetchAuth("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status !== 200) return setServerError(await fetchError(res));

      const { company, JWTToken } = await res.json();

      dispatch(setCompany({ ...company }));
      dispatch(setJWTToken(JWTToken));
      sendJWTTokenToServer(JWTToken);
      navigate("/");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error");
    }
  };

  if (user.company_name) {
    return (
      <div className={"container " + s.container}>
        <MainContainer serverError={serverError} title={user.company_name}>
          {user.company_name}
          <Button onClick={handleLeaveCompany}>Leave company</Button>
        </MainContainer>
      </div>
    );
  } else
    return (
      <div className={"container " + s.container}>
        <MainForm
          title="Create new company"
          serverError={serverError}
          handleSubmit={handleSubmit}
          SignupSchema={SignupSchema}
          initialValues={{ name: "" }}
          submitButtonName="Create company"
        >
          <Input
            id="company"
            name="name"
            placeholder="My company..."
            labelName="Company"
          />
        </MainForm>
      </div>
    );
};

export default Company;
