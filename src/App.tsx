import React, { useEffect, useState } from 'react';
import './App.css';
import { Chat } from './chat';

import * as io from "socket.io-client";


const socket = io.connect('http://localhost:4000');
function App() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket.on('connect' , () => {
      setUserName(socket.id)
      localStorage.setItem('userName', socket.id);
      //sends the username and socket ID to the Node.js server
      socket.emit('newUser', { userName, socketID: socket.id });
    })
  });

  return (
    <div className="App">
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Chat socket={socket} />
    </div>
  );
}

export default App;
