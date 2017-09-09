import React, { Component } from 'react';

import './ContentTopCaption.css';

export default class ContentTopCaption extends Component {
  renderMessageAbsen() {
    return (
      <div>
        <br />
        <br />
        <span>Sorry you're late</span>
      </div>
    );
  }
  render() {
    let absenMessageError;
    if (this.props.withAbsenMessageError) {
      absenMessageError = this.renderMessageAbsen();
    }
    return (
      <div style={styles.contentTopCaption}>
        <h3>Good Morning,</h3>
        <h1>Nofrets Poai</h1>
        {absenMessageError}
      </div>
    );
  }
}

const styles = {
  contentTopCaption: {
    display: 'inline-block',
    verticalAlign: 'top',
    whiteSpace: 'normal'
  }
};
