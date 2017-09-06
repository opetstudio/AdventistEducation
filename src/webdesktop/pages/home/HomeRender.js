'use strict';
import React from 'react';
import { Redirect } from 'react-router-dom';
// import Screen from './Screen';
import { Container } from 'semantic-ui-react';

import Header from '../includes/Header';
import Sidebar from '../includes/Sidebar';
import Footer from '../includes/Footer';
// const logo = require('../img/rayasem-logo-color.png');

export default function () {
  const { redirect } = this.state;

  if (redirect) {
    return <Redirect to='/login' />;
  }
  return (
      <div>
        <Header />
        <Sidebar />
        <Container>
        <div style={styles.content}>
            <span>Home Page Desktop/Web</span>
        </div>
        </Container>
        <Footer />
      </div>
  );
}

const styles = {
  content: {
    backgroundColor: '#61BD8C'
  }
};
