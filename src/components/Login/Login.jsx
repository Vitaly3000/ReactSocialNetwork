import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import style from './../common/FormsControls/FormsControls.module.css';
const LoginPage = (props) => {
  const logIn = (formData) => {
    let { email, password, rememberMe,captcha } = formData;
    props.login(email, password, rememberMe,captcha);
  };
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={logIn} />
    </div>
  );
};
const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="email"
          name="email"
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
          type="password"
        />
      </div>
      <div>
        <Field name="rememberMe" type="checkbox" component="input" />
        <label>RememberMe</label>
      </div>
      {props.captchaUrl && (
        <div>
          <img alt="captcha" src={props.captchaUrl} />
          <Field
            placeholder="captcha"
            name="captcha"
            component={Input}
            validate={[required]}
          />
        </div>
      )}
      {console.log(props.captchaUrl)}
      <button>log in</button>
      {props.error && <div className={style.commonError}>{props.error}</div>}
    </form>
  );
};
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);
let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(LoginPage);
