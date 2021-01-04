import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import {
  getStatus,
  getUserProfile,
  updateStatus,
} from '../../redux/profile-reducer';
import Profile from './Profile';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 13764;
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }
  render() {
    return <Profile {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
)(ProfileContainer);
