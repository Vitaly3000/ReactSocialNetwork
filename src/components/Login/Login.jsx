import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';

const LoginPage = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="login"
          name="login"
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder="password"
          name="password"
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field name="rememberMe" type="checkbox" component="input" />
        <label>RememberMe</label>
      </div>
      <button>log in</button>
    </form>
  );
};
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

export default LoginPage;
