'use strict';
import React, { Component } from 'react';
import { Header as Head } from 'semantic-ui-react';

export default class Header extends Component {
  render() {
    return (
      <Head as='h1'>
        Header
      </Head>
    );
  }
}
