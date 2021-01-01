import React from 'react';
import s from './Dialogs.module.css';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Redirect } from 'react-router-dom';

const Dialogs = (props) => {
  let DialogsElements = props.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));
  let MessagesElements = props.messages.map((message) => (
    <Message message={message.message} />
  ));

  let onAddMessage = () => {
    props.sendMessage();
  };
  let onChangeMessage = (e) => {
    let text = e.target.value;
    props.updateNewMessageText(text);
  };
  if (!props.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{DialogsElements}</div>
      <div className={s.messages}>{MessagesElements}</div>
      <textarea
        value={props.newMessageText}
        onChange={onChangeMessage}></textarea>
      <button onClick={onAddMessage}>Отправить</button>
    </div>
  );
};
export default Dialogs;
