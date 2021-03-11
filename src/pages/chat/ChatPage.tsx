import React from 'react';

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
  const [wsChannel, setWsChannel] = React.useState<WebSocket | null>(null);
  React.useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      setTimeout(createChannel, 3000);
    };
    function createChannel() {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();

      ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
      );
      ws?.addEventListener('close', closeHandler);
      setWsChannel(ws);
    }
    createChannel();
    return () => {
      ws.removeEventListener('close', closeHandler);
      ws.close();
    };
  }, []);

  return (
    <div>
      <ChatMessages wsChannel={wsChannel} />{' '}
      <ChatSendMessage wsChannel={wsChannel} />
    </div>
  );
};
export const ChatMessages: React.FC<{ wsChannel: WebSocket | null }> = ({
  wsChannel,
}) => {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([]);

  const messageHandler = (e: MessageEvent<any>): void => {
    let newMessages = JSON.parse(e.data);
    setMessages((prevMess) => [...prevMess, ...newMessages]);
  };
  React.useEffect(() => {
    wsChannel?.addEventListener('message', messageHandler);
    return () => {
      wsChannel?.removeEventListener('message', messageHandler);
    };
  }, [wsChannel]);
  return (
    <div style={{ height: '400px', overflowY: 'scroll' }}>
      {messages.map((m, index) => (
        <ChatMessage key={index} message={m} />
      ))}
    </div>
  );
};
export const ChatSendMessage: React.FC<{ wsChannel: WebSocket | null }> = ({
  wsChannel,
}) => {
  const sendMessage = () => {
    if (!message) {
      return;
    } else {
      wsChannel?.send(message);
      setMessage('');
    }
  };
  const [message, setMessage] = React.useState('');
  const [readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>(
    'pending',
  );
  const openHandler = () => {
    setReadyStatus('ready');
  };
  React.useEffect(() => {
    wsChannel?.addEventListener('open', openHandler);
    return () => {
      wsChannel?.removeEventListener('open', openHandler);
    };
  }, [wsChannel]);
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => {
            setMessage(e.currentTarget.value);
          }}
          value={message}></textarea>
      </div>
      <button
        disabled={readyStatus === null && readyStatus !== 'ready'}
        onClick={sendMessage}>
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
