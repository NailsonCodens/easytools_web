import io from 'socket.io-client';
const socketio = io('http://localhost:9090');

export default socketio;