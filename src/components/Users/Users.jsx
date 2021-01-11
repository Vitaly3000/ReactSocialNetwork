import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/img/user.jpg';

import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';

const Users = (props) => {
  return (
    <div className={style.users}>
      <Paginator
        onPageChanged={props.onPageChanged}
        currentPage={props.currentPage}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />
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
