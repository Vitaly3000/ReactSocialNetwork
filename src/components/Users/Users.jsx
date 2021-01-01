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
              disabled={props.followingInProgress.some((id) => id === u.id)}
              onClick={() => {
                props.toggleFollowingProgress(true, u.id);

                if (!u.followed) {
                  props.followUser(u.id).then((data) => {
                    props.toggleFollowingProgress(false, u.id);
                    if (data.resultCode === 0) {
                      props.toggleFollow(u.id);
                    }
                  });
                } else if (u.followed) {
                  props.toggleFollowingProgress(true, u.id);
                  props.unfollowUser(u.id).then((data) => {
                    props.toggleFollowingProgress(false, u.id);
                    if (data.resultCode === 0) {
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
