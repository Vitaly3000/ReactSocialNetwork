import { stopSubmit } from 'redux-form';


import { authAPI, securityApi } from '../api/api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};
let initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        ...action.payload,
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
type SetAuthUserDataActionPayloadType = {
  email: string | null;
  userId: number | null;
  login: string | null;
  isAuth: boolean;
};
type SetAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};
export const setAuthUserData = (
  email: string | null,
  userId: number | null,
  login: string | null,
  isAuth: boolean,
): SetAuthUserDataActionType => {
  return {
    type: SET_AUTH_USER_DATA,
    payload: { userId, email, login, isAuth },
  };
};

type GetCaptchaUrlSuccess = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  captchaUrl: string;
};
export const getCaptchaUrlSuccess = (
  captchaUrl: string,
): GetCaptchaUrlSuccess => {
  return { type: GET_CAPTCHA_URL_SUCCESS, captchaUrl };
};

export const getAuthUserData = () => async (dispatch: any) => {
  let data = await authAPI.me();
  if (data.resultCode === 0) {
    let { email, id, login } = data.data;
    dispatch(setAuthUserData(email, id, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string,
) => async (dispatch: any) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptachaUrl());
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

export const logout = () => async (dispatch: any) => {
  let data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
export const getCaptachaUrl = () => async (dispatch: any) => {
  let data = await securityApi.getCaptchaUrl();

  const captchaUrl = data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
