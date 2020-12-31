import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/img/user.jpg';

import { NavLink } from 'react-router-dom';
import * as axios from 'axios';
const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div className={style.users}>
      <div className={style.paginator}>
        {pages.map((p) => {
          return (
            <button
              onClick={() => props.onPageChanged(p)}
              className={props.currentPage === p && style.currentPage}>
              {p}
            </button>
          );
        })}
      </div>
      {props.users.map((u) => {
        return (
          <div className={style.user}>
            <NavLink to={'/profile/' + u.id}>
              <img
                className={style.photo}
                src={u.photo ? u.small : userPhoto}
                alt="a sad frog"
              />
            </NavLink>
            <div>Name:</div>
            <div className={style.name}>{u.name}</div>

            <button
              onClick={() => {
                console.log(u.followed);
                if (!u.followed) {
                  axios
                    .post(
                      `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                      {},
                      {
                        withCredentials: true,
                        headers: {
                          'API-KEY': '7dd38746-eefb-4807-bae3-6e3f38936285',
                        },
                      },
                    )
                    .then((response) => {
                      if (response.data.resultCode == 0) {
                        props.toggleFollow(u.id);
                      }
                    });
                } else if(u.followed) {
                  axios
                    .delete(
                      `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                      {
                        withCredentials: true,
                        headers: {
                          'API-KEY': '7dd38746-eefb-4807-bae3-6e3f38936285',
                        },
                      },
                    )
                    .then((response) => {
                      if (response.data.resultCode == 0) {
                        props.toggleFollow(u.id);
                      }
                    });
                }
              }}>
              {u.followed ? 'Отписаться' : 'Подписаться'}
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Users;
