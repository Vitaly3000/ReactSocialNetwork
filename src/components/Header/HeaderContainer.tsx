import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import Header, { MapPropsType, DispatchPropsType } from './Header';

class HeaderContainer extends React.Component<
  MapPropsType & DispatchPropsType
> {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state: AppStateType) => ({
  userId: state.auth.userId,
  email: state.auth.email,
  login: state.auth.login,
  isAuth: state.auth.isAuth,
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps,
  { logout },
)(HeaderContainer);
