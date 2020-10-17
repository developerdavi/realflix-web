import React, { useEffect, useRef, useState } from 'react';
import { Player } from 'video-react';

import api from '../Services/Api';
import io from '../Services/Socket';
import Constants from '../Utils/Constants';

export default function HomeScreen() {
  const player = useRef();

  const [room, setRoom] = useState(false);
  const [mediaID, setMediaID] = useState('');
  const [value, setValue] = useState('');
  const [seekValue, setSeekValue] = useState(0);

  const handleSubmit = async () => {
    if (value.length === 0) {
      return alert('Invalid room ID');
    }

    try {
      const { data } = await api.get(`/room/${value}`);
      setMediaID(data.filename);
      setRoom(value);
      io.emit('join', value);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.error) {
        return alert(error.response.data.error);
      }
      alert('An error occurred');
    }
  };

  const handleSeekSubmit = () => {
    io.emit('seek', seekValue);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSeekChange = (e) => {
    setSeekValue(e.target.value);
  };

  useEffect(() => {
    if (room) {
      io.on('seek', (time) => {
        player.current.seek(time);
        player.current.play();
      });
    }
  }, [room]);

  return (
    <header className="App-header">
      <h1>RealFlix</h1>
      {room ? (
        <>
          <div className="container center">
            <input type="text" name="seconds" placeholder="Time (seconds)" onChange={handleSeekChange} />
            <button type="submit" onClick={handleSeekSubmit}>Seek</button>
          </div>
          <Player
            playsInline
            autoPlay
            poster="/assets/poster.png"
            src={`${Constants.API_URL}/media?id=${mediaID}`}
            ref={player}
          />
        </>
      ) : (
        <div className="container center">
          <input type="text" name="room" placeholder="Room ID" onChange={handleChange} />
          <button type="submit" onClick={handleSubmit}>Join</button>
        </div>
      )}
    </header>
  );
}
