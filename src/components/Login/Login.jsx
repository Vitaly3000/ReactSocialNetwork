import React from 'react';
import { Field, reduxForm } from 'redux-form';

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
        <Field placeholder="login" name="login" component="input" />
      </div>
      <div>
        <Field placeholder="password" name="password" component="input" />
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
