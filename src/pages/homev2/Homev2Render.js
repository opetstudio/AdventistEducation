'use strict';
import React from 'react';
// import Screen from './Screen';
import { Container } from 'semantic-ui-react';

import Header from '../includes/Header';
import Sidebar from '../includes/Sidebar';
import Footer from '../includes/Footer';
// const logo = require('../img/rayasem-logo-color.png');

export default function () {
  return (
      <Container>
        <Header />
        <Sidebar />
        <div style={styles.content}>
            <span>Homev2 Page Desktop/Web</span>
        </div>
        <Footer />
      </Container>
  );
}

const styles = {
  content: {
    backgroundColor: '#61BD8C'
  }
};
