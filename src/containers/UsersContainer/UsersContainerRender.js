import React from 'react';
import { Button, Table, Label } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
// import { fetchData } from '../../../actions/fetchData';
import UsersList from '../../components/UsersList/UsersList';

export default function () {
    return (
      <div>
        <span>Members Page Desktop/Web</span>
        <Button onClick={() => { this._onPressButton(); }}>
          Load Data
        </Button>
        <UsersList title="Users">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.props.users.data.length ?
                (
                  this.props.users.data.map(
                    (person, i) => (
                        <Table.Row key={i}>
                          <Table.Cell>
                            <Label ribbon>{person.name}</Label>
                          </Table.Cell>
                          <Table.Cell>
                            <Label ribbon>{person.age}</Label>
                          </Table.Cell>
                        </Table.Row>
                    )
                  )
                ) : null
              }
            </Table.Body>
          </Table>
        </UsersList>
      </div>
  );
}


// UsersContainerRender.propTypes = {
//   users: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     age: PropTypes.number.isRequired
//   })).isRequired
// };

// export default UsersContainerRender;
