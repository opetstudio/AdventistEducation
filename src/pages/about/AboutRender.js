'use strict';
import React from 'react';
// import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from '../includes/Header';
import Sidebar from '../includes/Sidebar';
import Footer from '../includes/Footer';

export default function () {
  return (
    <Container>
      <Header />
      <Sidebar />
      <div style={styles.content}>
          <span>About Page Desktop/Web</span>
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
