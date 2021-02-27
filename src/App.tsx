import React from 'react';
import './App.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateType } from './redux/redux-store';

import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Preloader from './components/common/preloader/preloader';
type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};
class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return (
        <div className="app-wrapper">
          <Preloader />
        </div>
      );
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/profile" />
            </Route>
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="*" render={() => <div>404</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}
let mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
  };
};
const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }),
)(App);
const SocialApp: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default SocialApp;
