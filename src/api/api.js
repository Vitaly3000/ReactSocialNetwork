import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '7dd38746-eefb-4807-bae3-6e3f38936285',
  },
});
export let usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
};
