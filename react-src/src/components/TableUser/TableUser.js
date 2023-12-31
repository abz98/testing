import React from 'react';
import { Table } from 'semantic-ui-react';
import ModalUser from '../ModalUser/ModalUser';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

const TableUser = (props) => {
  let users = props.users;

  users = users.map((user) => (
    <Table.Row key={user._id}>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.age}</Table.Cell>
      <Table.Cell>{user.gender}</Table.Cell>
      <Table.Cell>
        <ModalUser
          headerTitle='Edit User'
          buttonTriggerTitle='Edit'
          buttonSubmitTitle='Save'
          buttonColor='blue'
          userID={user._id}
          onUserUpdated={props.onUserUpdated}
          server={props.server}
          socket={props.socket}
        />
        <ModalConfirmDelete
          headerTitle='Delete User'
          buttonTriggerTitle='Delete'
          buttonColor='black'
          user={user}
          onUserDeleted={props.onUserDeleted}
          server={props.server}
          socket={props.socket}
        />
      </Table.Cell>
    </Table.Row>
  ));

  // Make every new user appear on top of the list
  users = [...users].reverse();

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Age</Table.HeaderCell>
          <Table.HeaderCell>Gender</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{users}</Table.Body>
    </Table>
  );
};

export default TableUser;
