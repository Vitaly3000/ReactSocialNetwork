import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';

const Dialogs = (props) => {
  let DialogsElements = props.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));

  let MessagesElements = props.messages.map((message) => (
    <Message message={message.message} />
  ));

  let sendNewMessage = (value) => {
    props.sendMessage(value.newMessageText);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{DialogsElements}</div>
      <div className={s.messages}>{MessagesElements}</div>
      <AddMessageFormRedux onSubmit={sendNewMessage} />
    </div>
  );
};
const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newMessageText"
          component="textarea"
          placeholder="Введите сообщение"
        />
      </div>
      <button>Отправить</button>
    </form>
  );
};
const AddMessageFormRedux = reduxForm({
  form: 'dialogAddMessageForm',
})(AddMessageForm);
export default Dialogs;
