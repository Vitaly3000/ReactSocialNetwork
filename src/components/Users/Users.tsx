import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FilterType,
  requestUsers,
  follow,
  unfollow,
} from '../../redux/users-reducer';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../redux/users-selectors';
import style from './Users.module.css';

import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import Preloader from '../common/preloader/preloader';

type PropsType = {};

const UsersPage: React.FC<PropsType> = () => {
  const dispatch = useDispatch();
  const onPageChanged = (pageNumber: number) =>
    dispatch(requestUsers(pageNumber, pageSize, filter));
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const followHandle = (userId: number) => dispatch(follow(userId));
  const unfollowHandle = (userId: number) => dispatch(unfollow(userId));
  const followingInProgress = useSelector(getFollowingInProgress);
  const currentPage = useSelector(getCurrentPage);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getUsers);
  const isFetching = useSelector(getIsFetching);
  useEffect(() => {
    dispatch(requestUsers(1, pageSize, filter));
  }, []);
  return (
    <>
      {isFetching ? <Preloader /> : null}

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
            unfollow={unfollowHandle}
            follow={followHandle}
            followingInProgress={followingInProgress}></User>
        ))}
      </div>
    </>
  );
};

export default UsersPage;
