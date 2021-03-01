import React from 'react';
import { connect } from 'react-redux';

import {
  requestUsers,
  follow,
  unfollow,
  FilterType,
} from '../../redux/users-reducer';

import Users from './Users';
import Preloader from '../common/preloader/preloader';
import { compose } from 'redux';
import {
  getCurrentPage,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getFollowingInProgress,
  getUsersFilter,
} from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
type MapStatePropsType = {
  users: Array<UserType>;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
  pageSize: number;
  filter: FilterType;
};
type MapDispatchPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  requestUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void;
};
type PropsType = MapDispatchPropsType & MapStatePropsType;
class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.requestUsers(1, this.props.pageSize, this.props.filter);
  }
  onPageChanged = (pageNumber: number) => {
    this.props.requestUsers(
      pageNumber,
      this.props.pageSize,
      this.props.filter,
    );
  };
  onFilterChanged = (filter: FilterType) => {
    this.props.requestUsers(1, this.props.pageSize, filter);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          onFilterChanged={this.onFilterChanged}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};

export default compose<React.FunctionComponent>(
  connect(mapStateToProps, {
    requestUsers,
    follow,
    unfollow,
  }),
)(UsersContainer);
