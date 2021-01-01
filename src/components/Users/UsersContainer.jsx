import React from 'react';
import { connect } from 'react-redux';

import {
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleFollow,
  toggleIsFetching,
  toggleFollowingProgress,
  getUsers,
  follow,
  unfollow,
} from '../../redux/users-reducer';

import Users from './Users';
import Preloader from '../common/preloader/preloader';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
    this.props.setCurrentPage(pageNumber);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
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
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,

  getUsers,
  follow,
  unfollow,
})(UsersContainer);
