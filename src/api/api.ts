import { ProfileType } from './../types/types';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '4f6392d9-338c-4498-aa8b-8a07352b48d6',
  },
});

export let usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },

  followUser(userId: number) {
    return instance.post(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
  unfollowUser(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
};
export let profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId).then((response) => {
      return response.data;
    });
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId).then((response) => {
      return response.data;
    });
  },
  updateStatus(status: string) {
    return instance
      .put(`profile/status`, { status: status })
      .then((response) => {
        return response.data;
      });
  },
  savePhoto(photoFile: File) {
    let formData = new FormData();
    formData.append('image', photoFile);
    return instance
      .put('profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data;
      });
  },
  saveProfile(profile: ProfileType) {
    return instance.put('profile', profile).then((response) => {
      return response.data;
    });
  },
};
export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}
type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};
type LoginResponseType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};
export let authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((response) => {
      return response.data;
    });
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: null | string = null,
  ) {
    return instance
      .post<LoginResponseType>(`/auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => {
        return response.data;
      });
  },
  logout() {
    return instance.delete(`/auth/login`).then((response) => {
      return response.data;
    });
  },
};

export const securityApi = {
  getCaptchaUrl() {
    return instance.get('/security/get-captcha-url').then((response) => {
      return response.data;
    });
  },
};
