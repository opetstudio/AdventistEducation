'use strict';
import React from 'react';
// import Screen from './Screen';
import { Container } from 'semantic-ui-react';
// const logo = require('../img/rayasem-logo-color.png');

export default function () {
  return (
      <Container>
        <div style={styles.content}>
            <span>Welcome Page Desktop/Web</span>
        </div>
      </Container>
  );
}

const styles = {
  content: {
    backgroundColor: '#61BD8C'
  }
};
