import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/img/user.jpg';

import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';
import { UserType } from '../../types/types';
type PropsType = {
  onPageChanged: (pageNumber: number) => void;
  currentPage: number;
  totalUsersCount: number;
  pageSize: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};
const Users: React.FC<PropsType> = ({
  onPageChanged,
  currentPage,
  totalUsersCount,
  pageSize,
  users,
  followingInProgress,
  follow,
  unfollow,
}) => {
  return (
    <div className={style.users}>
      <Paginator
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        portionSize={15}
      />
      {users.map((u) => {
        return (
          <div key={u.id} className={style.user}>
            <NavLink to={'/profile/' + u.id}>
              <img
                className={style.photo}
                src={u.photos.large ? u.photos.large : userPhoto}
                alt="a sad frog"
              />
            </NavLink>

            <div className={style.name}>{u.name}</div>

            <button
              disabled={followingInProgress.some((id: number) => id === u.id)}
              onClick={() => {
                if (!u.followed) {
                  follow(u.id);
                } else {
                  unfollow(u.id);
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
