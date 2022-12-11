import * as Yup from 'yup';
import Input from '../../components/Form/Input/Input';
import MainForm from '../../components/Form/MainForm/MainForm';
import { useServerErrorForms, useGetJWTToken } from '../../hooks';
import s from './Login.module.scss';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').max(20, 'Too Long!').required('Required'),
});

const Login = () => {
  const [serverError, setServerError] = useServerErrorForms();
  const handleSubmit = useGetJWTToken('/api/login', setServerError);

  return (
    <div className={'container ' + s.container}>
      <MainForm
        title="LOGIN"
        serverError={serverError}
        handleSubmit={handleSubmit}
        SignupSchema={SignupSchema}
        initialValues={{ email: '', password: '' }}
        submitButtonName="Login"
        backLinkName="Back to SignUp"
        backLinkHref="/signup">
        <Input id="email" name="email" placeholder="john@acme.com..." labelName="Email" />
        <Input
          id="password"
          name="password"
          placeholder="password..."
          labelName="Password"
          type="password"
        />
      </MainForm>
    </div>
  );
};

export default Login;
