import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, BrowserRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="content">
          <Route
            path="/Dialogs"
            render={() => <DialogsContainer store={props.store} />}
          />
          <Route
            path="/Profile"
            render={() => <Profile store={props.store} s />}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
