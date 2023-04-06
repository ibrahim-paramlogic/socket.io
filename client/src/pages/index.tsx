import { useEffect, useState } from 'react';
import { socket } from './_app';
import { SelectUsername } from '../../components/SelectUsername';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') as string);
  }, []);

  //on - listen, emit - action
  useEffect(() => {
    // if(socket.connected){
      socket.on('chat_message', (newMessage) => {
        console.log('server sent me this', newMessage);
        setMessages((previousMessages) => [...previousMessages, newMessage]);
      });
      //note
      return () => {
        socket.off('chat_message');
      };
    // }
  }, [socket.connected]);

  const sendHandler = (text: string) => {
    // console.log(username);
    socket.emit('chat_message', {
      username,
      message: text,
    });
    setMessage('');
  };

  if (!username) return <SelectUsername {...{ setUsername }} />;

  return (
    <>
      <main>
        <h1>Chat Application</h1>

        <div style={{ maxWidth: 500, textAlign: 'center' }}>
          {messages.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  textAlign: item.username === username ? 'right' : 'left',
                }}
              >
                <p style={{ fontSize: 10 }}>{item.username}</p>
                <p>{item.message}</p>
              </div>
            );
          })}
        </div>

        <input  value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => sendHandler(message)}>Send Message</button>
      </main>
    </>
  );
}
