import React from 'react';
import style from './Users.module.css';

import Paginator from '../common/Paginator/Paginator';
import { UserType } from '../../types/types';
import User from './User';
import { FilterType } from '../../redux/users-reducer';
import { UsersSearchForm } from './UsersSearchForm';

type PropsType = {
  onPageChanged: (pageNumber: number) => void;
  currentPage: number;
  totalUsersCount: number;
  pageSize: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  onFilterChanged: (filter: FilterType) => void;
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
  onFilterChanged,
}) => {
  return (
    <div className={style.users}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        portionSize={15}
      />
      {users.map((u) => (
        <User
          user={u}
          unfollow={unfollow}
          follow={follow}
          followingInProgress={followingInProgress}></User>
      ))}
    </div>
  );
};

export default Users;
