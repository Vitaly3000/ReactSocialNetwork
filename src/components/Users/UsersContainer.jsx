import React from 'react';
import { connect } from 'react-redux';

import {
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleFollow,
  toggleIsFetching,
  toggleFollowingProgress,
} from '../../redux/users-reducer';

import Users from './Users';
import Preloader from '../common/preloader/preloader';
import { usersAPI } from '../../api/api';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    usersAPI
      .getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
        if (data.totalCount > 500) {
          this.props.setTotalUsersCount(200);
        }
      });
  }
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);

    usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
    });
  };
  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            unfollowUser={usersAPI.unfollowUser}
            followUser={usersAPI.followUser}
            isFetching={this.props.isFetching}
            followingInProgress={this.props.followingInProgress}
            users={this.props.users}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            toggleFollow={this.props.toggleFollow}
            toggleFollowingProgress={this.props.toggleFollowingProgress}
          />
        )}
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};
// let mapDispatchToProps = (dispatch) => {
//   return {
//     toggleFollow: (userId) => {
//       dispatch(toggleFollowActionCreator(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersActionCreator(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageActionCreator(pageNumber));
//     },
//     setTotalUsersCount: (totalUsersCount) => {
//       dispatch(setTotalUsersCountActionCreator(totalUsersCount));
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingActionCreator(isFetching));
//     },
//   };
// };

export default connect(mapStateToProps, {
  toggleFollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleFollowingProgress,
})(UsersContainer);
