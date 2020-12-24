import React from 'react';

import s from './Dialogs.module.css';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreater,
} from '../../redux/state';

const Dialogs = (props) => {
  let DialogsElements = props.messagesPage.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));
  let MessagesElements = props.messagesPage.messages.map((message) => (
    <Message message={message.message} />
  ));
  let newMessageElement = React.createRef();
  let addMessage = () => {
    props.dispatch(sendMessageActionCreator());
  };
  let onChangeMessage = () => {
    let text = newMessageElement.current.value;

    props.dispatch(updateNewMessageTextActionCreater(text));
  };
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{DialogsElements}</div>
      <div className={s.messages}>{MessagesElements}</div>
      <textarea
        ref={newMessageElement}
        value={props.messagesPage.newMessageText}
        onChange={onChangeMessage}></textarea>
      <button onClick={addMessage}>Отправить</button>
    </div>
  );
};
export default Dialogs;
