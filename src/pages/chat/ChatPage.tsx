import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendChatMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';

type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

export const Chat: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);
  return (
    <div>
      <ChatMessages /> <ChatSendMessage />
    </div>
  );
};
export const ChatMessages: React.FC<{}> = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  return (
    <div style={{ height: '400px', overflowY: 'scroll' }}>
      {messages.map((m, index) => (
        <ChatMessage key={index} message={m} />
      ))}
    </div>
  );
};
export const ChatSendMessage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const sendMessageHandler = () => {
    if (!message) {
      return;
    } else {
      dispatch(sendChatMessage(message));
      setMessage('');
    }
  };
  const [message, setMessage] = React.useState('');
  const [readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>(
    'pending',
  );

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => {
            setMessage(e.currentTarget.value);
          }}
          value={message}></textarea>
      </div>
      <button disabled={false} onClick={sendMessageHandler}>
        send message
      </button>
    </div>
  );
};

type ChatMessagePropsType = {
  message: ChatMessageType;
};
export const ChatMessage: React.FC<ChatMessagePropsType> = ({ message }) => {
  return (
    <div>
      <img
        style={{ borderRadius: '50%', width: '50px' }}
        src={message.photo || 'https://via.placeholder.com/50'}
        alt=""
      />
      <b>{message.userName}</b>
      <br />
      <div
        style={{
          border: '2px solid black',
          width: '400px',
          background: 'white',
        }}>
        {message.message}
      </div>
      <hr />
    </div>
  );
};
