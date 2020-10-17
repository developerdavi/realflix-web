import socketio from 'socket.io-client';

import Constants from '../Utils/Constants';

const io = socketio.connect(Constants.API_URL);

export default io;
