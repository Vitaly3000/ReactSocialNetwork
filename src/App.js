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
          <Route path="/Dialogs" render ={()=> <Dialogs dialogs={props.state.messagesPage.dialogs} messages = {props.state.messagesPage.messages}/>} />
          <Route path="/Profile" render ={()=> <Profile profilePage={props.state.profilePage} updateNewPostText={props.updateNewPostText} addPost={props.addPost}/>} />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
