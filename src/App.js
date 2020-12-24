import React from 'react';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, BrowserRouter } from 'react-router-dom';
function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="content">
          <Route
            path="/Dialogs"
            render={() => (
              <Dialogs
                messagesPage={props.state.messagesPage}
                
                dispatch={props.dispatch}
              />
            )}
          />
          <Route
            path="/Profile"
            render={() => (
              <Profile
                profilePage={props.state.profilePage}
                dispatch={props.dispatch}
              />
            )}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
