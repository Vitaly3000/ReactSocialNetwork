import React from 'react';

import s from './Dialogs.module.css';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreater,
} from '../../redux/dialogs-reducer';

const Dialogs = (props) => {
  let DialogsElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));
  let MessagesElements = props.dialogsPage.messages.map((message) => (
    <Message message={message.message} />
  ));

  let addMessage = () => {
    props.dispatch(sendMessageActionCreator());
  };
  let onChangeMessage = (e) => {
    let text = e.target.value;

    props.dispatch(updateNewMessageTextActionCreater(text));
  };
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{DialogsElements}</div>
      <div className={s.messages}>{MessagesElements}</div>
      <textarea
        value={props.dialogsPage.newMessageText}
        onChange={onChangeMessage}></textarea>
      <button onClick={addMessage}>Отправить</button>
    </div>
  );
};
export default Dialogs;
