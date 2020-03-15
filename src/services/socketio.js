import io from 'socket.io-client';

let baseURL = process.env.REACT_APP_URL_SOCKETIO_DEV;

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.REACT_APP_URL_SOCKETIO_BUILD;
}


console.log(baseURL)


const socketio = io(baseURL);

export default socketio;