import { stopSubmit } from 'redux-form';
import { authAPI, securityApi } from '../api/api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        ...action.data,
      };
    }
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    }
    default: {
      return state;
    }
  }
};
export const setAuthUserData = (email, userId, login, isAuth) => {
  return { type: SET_AUTH_USER_DATA, data: { userId, email, login, isAuth } };
};
export const getAuthUserData = () => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === 0) {
    let { email, id, login } = data.data;
    dispatch(setAuthUserData(email, id, login, true));
  }
};
export const getCaptchaUrlSuccess = (captchaUrl) => {
  return { type: GET_CAPTCHA_URL_SUCCESS, captchaUrl };
};
export const login = (email, password, rememberMe,captcha) => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe,captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptachaUrl())
    }
    let messageError =
      data.messages.length > 0 ? data.messages[0] : 'some error';
    dispatch(
      stopSubmit('login', {
        _error: messageError,
      }),
    );
  }
};

export const logout = () => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
export const getCaptachaUrl = () => async (dispatch) => {
  let data = await securityApi.getCaptchaUrl();

  const captchaUrl = data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
