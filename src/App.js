import React, { useEffect, useRef, useState } from 'react';
import { Player } from 'video-react';
import axios from 'axios';
import socketio from 'socket.io-client';

import './App.css';
import 'video-react/dist/video-react.css';

const io = socketio.connect('http://192.168.1.9:3333');

function App() {
  const player = useRef();

  const [room, setRoom] = useState(false);
  const [value, setValue] = useState('');
  const [seekValue, setSeekValue] = useState(0);

  const handleSubmit = async () => {
    try {
      await axios.get(`http://192.168.1.9:3333/media/${value}`);
      setRoom(value);
      io.emit('join', value);
    } catch (error) {
      if (error.response.data.error) {
        return alert(error.response.data.error);
      }
      alert('An error occurred');
    }
  };

  const handleSeekSubmit = () => {
    io.emit('seek', seekValue);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSeekChange = (e) => {
    setSeekValue(e.target.value);
  };

  useEffect(() => {
    // setTimeout(() => {
    //   player.current.seek(40);
    //   setTimeout(() => {
    //     console.log(player.current.getState());
    //   }, 2000);
    // }, 2000);

    if (room) {
      io.on('seek', (time) => {
        player.current.seek(time);
      })
    }
  }, [room]);

  return (
    <div className="App">
      <header className="App-header">
        {room ? (
        <>
          <div className="container">
            <input type="text" name="seconds" placeholder="Time (seconds)" onChange={handleSeekChange}/>
            <button onClick={handleSeekSubmit}>Seek</button>
          </div>
          <Player
            playsInline
            autoPlay={true}
            poster="/assets/poster.png"
            src={`http://192.168.1.9:3333/media/${room}`}
            ref={player}
          />
        </>
        ) :
        <div className="container">
          <input type="text" name="room" onChange={handleChange}/>
          <button onClick={handleSubmit}>Join room</button>
        </div>}
      </header>
    </div>
  );
}

export default App;
