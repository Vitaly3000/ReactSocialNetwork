import React from 'react';
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreater,
} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
  let state = props.store.getState();
  let sendMessage = () => {
    props.store.dispatch(sendMessageActionCreator());
  };
  let updateNewMessageText = (text) => {
    props.store.dispatch(updateNewMessageTextActionCreater(text));
  };
  return (
    <Dialogs
      sendMessage={sendMessage}
      updateNewMessageText={updateNewMessageText}
      newMessageText={state.dialogsPage.newMessageText}
      dialogs={state.dialogsPage.dialogs}
      messages={state.dialogsPage.messages}
    />
  );
};
export default DialogsContainer;
