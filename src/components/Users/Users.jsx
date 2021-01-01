import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/img/user.jpg';

import { NavLink } from 'react-router-dom';

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

            <div className={style.name}>{u.name}</div>

            <button
              disabled={props.followingInProgress.some((id) => id === u.id)}
              onClick={() => {
                if (!u.followed) {
                  props.follow(u.id);
                } else {
                  props.unfollow(u.id);
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
