import React from 'react';
const ws = new WebSocket(
  'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
);
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
  return (
    <div>
      <ChatMessages /> <ChatSendMessage />
    </div>
  );
};
export const ChatMessages: React.FC = () => {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([]);
  React.useEffect(() => {
    ws.addEventListener('message', (e) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMess) => [...prevMess, ...newMessages]);
    });
  }, []);
  return (
    <div style={{ height: '400px', overflowY: 'scroll' }}>
      {messages.map((m, index) => (
        <ChatMessage key={index} message={m} />
      ))}
    </div>
  );
};
export const ChatSendMessage: React.FC = () => {
  const sendMessage = () => {
    if (!message) {
      return;
    } else {
      ws.send(message);
      setMessage('');
    }
  };
  const [message, setMessage] = React.useState('');
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => {
            setMessage(e.currentTarget.value);
          }}
          value={message}></textarea>
      </div>
      <button onClick={sendMessage}>send message</button>
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
