'use strict';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../includes/Header';
import Sidebar from '../includes/Sidebar';
import Footer from '../includes/Footer';

// import UsersList from '../../components/UsersList/UsersList';
import UsersContainer from '../../containers/UsersContainer/UsersContainer';

export default function () {
  return (
    <Container>
      <Header />
      <Sidebar />
      {/* <div style={styles.content}>
          <span>Counter Page Desktop/Web</span>
          <button onClick={() => { this._onPressButton(); }}>
            Load Data
          </button>
      </div> */}
      <div>
        {/* {
          // this.props.users.isFetching && <span>Loading</span>
        } */}
        <UsersContainer />
      </div>
      <Footer />
    </Container>
  );
}

// const styles = {
//   content: {
//     backgroundColor: '#61BD8C'
//   }
// };
