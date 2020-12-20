import React from 'react';

import s from './Dialogs.module.css';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
  let DialogsElements = props.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));
  let MessagesElements = props.messages.map((message) => (
    <Message message={message.message} />
  ));
  let newMessageElement = React.createRef();
  let addMessage = () => {
    alert(newMessageElement.current.value);
  };
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{DialogsElements}</div>
      <div className={s.messages}>{MessagesElements}</div>
      <textarea  ref={newMessageElement}></textarea>
      <button onClick={addMessage}>Отправить</button>
    </div>
  );
};
export default Dialogs;
