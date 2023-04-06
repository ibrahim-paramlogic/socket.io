import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  return res.json('Hello World');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3001',
  },
});

httpServer.listen(3000, () => {
  console.log('socket server started...');
});


io.on('connection', (socket) => {
  // console.log(socket.id);
  socket.on('chat_message', (data) => {
    // console.log(data);
    io.emit('chat_message', data);
  });
});
