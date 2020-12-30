import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';

import { Route, BrowserRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="content">
          <Route path="/Dialogs" render={() => <DialogsContainer />} />
          <Route path="/Profile" render={() => <ProfileContainer />} />
          <Route path="/Users" render={() => <UsersContainer />} />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
