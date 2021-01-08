import React from 'react';
import { connect } from 'react-redux';
import {logout } from '../../redux/auth-reducer';
import Header from './Header';

class HeaderContainer extends React.Component {
  
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  email: state.auth.email,
  login: state.auth.login,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {logout })(
  HeaderContainer,
);
