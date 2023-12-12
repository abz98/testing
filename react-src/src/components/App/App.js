import React, { useEffect, useState } from 'react';
import { Container, Button } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';

import logo from '../../mern-logo.png';
import './App.css';
import { useAuth } from '../../provider/userContext';

const App = () => {
  const server = process.env.REACT_APP_API_URL || '';
  const socket = io.connect(server);
  const { setToken } = useAuth()
  const [users, setUsers] = useState([]);
  const [online, setOnline] = useState(0);

  useEffect(() => {
    fetchUsers();
    socket.on('visitor enters', (data) => setOnline(data));
    socket.on('visitor exits', (data) => setOnline(data));
    socket.on('add', (data) => handleUserAdded(data));
    socket.on('update', (data) => handleUserUpdated(data));
    socket.on('delete', (data) => handleUserDeleted(data));

    return () => {
      // Clean up socket listeners when component unmounts
      socket.disconnect();
    };
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${server}/api/users/`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserAdded = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUserUpdated = (user) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      const index = updatedUsers.findIndex((u) => u._id === user._id);
      if (index !== -1) {
        updatedUsers[index] = user;
      }
      return updatedUsers;
    });
  };

  const handleUserDeleted = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
  };

  const peopleOnline = online - 1;
  let onlineText = '';

  if (peopleOnline < 1) {
    onlineText = 'No one else is online';
  } else {
    onlineText =
      peopleOnline > 1
        ? `${online - 1} people are online`
        : `${online - 1} person is online`;
  }

  return (
    <div>
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-intro'>MERN CRUD</h1>
          <p>
            A simple records system using MongoDB, Express.js, React.js, and
            Node.js. REST API was implemented on the back-end.
            <br />
            CREATE, READ, UPDATE, and DELETE operations are updated in
            real-time to online users using Socket.io.
          </p>
          <Button onClick={() => setToken()}>Logout</Button>
        </div>
      </div>
      <Container>
        <ModalUser
          headerTitle='Add User'
          buttonTriggerTitle='Add New'
          buttonSubmitTitle='Add'
          buttonColor='green'
          onUserAdded={handleUserAdded}
          server={server}
          socket={socket}
        />
        <em id='online'>{onlineText}</em>
        <TableUser
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
          users={users}
          server={server}
          socket={socket}
        />
      </Container>
      <br />
    </div>
  );
};

export default App;
