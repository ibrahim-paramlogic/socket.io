import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', {
  autoConnect: false,
});

export default function App({ Component, pageProps }: AppProps) {
  socket.on('connect', () => {
    //Any action that you want to do on successful connection with socket
    console.log('socket successfully connect with localhost:3000');
  });

  return <Component {...pageProps} />;
}
