import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

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
const maxLength = maxLengthCreator(50);
const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newMessageText"
          component={Textarea}
          placeholder="Введите сообщение"
          validate={[required, maxLength]}
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
