import * as Yup from 'yup';
import Input from '../../components/Form/Input/Input';
import MainForm from '../../components/Form/MainForm/MainForm';
import { useServerErrorForms, useGetJWTToken } from '../../hooks';
import s from './SignUp.module.scss';

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too Short!').max(30, 'Too Long!').required('Required'),
  password: Yup.string().min(4, 'Too Short!').max(20, 'Too Long!').required('Required'),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const SignUp = () => {
  const [serverError, setServerError] = useServerErrorForms();
  const handleSubmit = useGetJWTToken('/api/signup', setServerError);

  return (
    <div className={'container ' + s.container}>
      <MainForm
        title="SIGNUP"
        serverError={serverError}
        handleSubmit={handleSubmit}
        SignupSchema={SignupSchema}
        initialValues={{ username: '', email: '', password: '', repeatPassword: '' }}
        submitButtonName="SignUp"
        backLinkName="Back to login"
        backLinkHref="/login">
        <Input id="username" name="username" placeholder="John..." labelName="Your name" />
        <Input id="email" name="email" placeholder="john@acme.com..." labelName="Email" />
        <Input
          id="password"
          name="password"
          placeholder="password..."
          labelName="Password"
          type="password"
        />
        <Input
          id="repeatPassword"
          name="repeatPassword"
          placeholder="password..."
          labelName="Repeat password"
          type="password"
        />
      </MainForm>
    </div>
  );
};

export default SignUp;
