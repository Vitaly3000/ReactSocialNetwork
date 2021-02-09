import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';

import { authAPI, ResultCodesEnum, securityApi } from '../api/api';
import { AppStateType } from './redux-store';

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
type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccess;
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

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === ResultCodesEnum.Success) {
    let { email, id, login } = data.data;
    dispatch(setAuthUserData(email, id, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: null | string,
) => async (dispatch: any) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
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
