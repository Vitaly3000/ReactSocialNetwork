import React from 'react';
import { connect } from 'react-redux';

import {
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  requestUsers,
  follow,
  unfollow,
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
} from '../../redux/users-selectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers();
  }
  onPageChanged = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
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
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    setUsers,
    setTotalUsersCount,
    toggleIsFetching,
    requestUsers,
    follow,
    unfollow,
  }),
)(UsersContainer);
