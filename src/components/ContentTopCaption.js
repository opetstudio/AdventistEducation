import React, { Component } from 'react';

import './ContentTopCaption.css';

export default class ContentTopCaption extends Component {
  renderMessageAbsen(msg) {
    return (
      <div>
        <br />
        <br />
        <span>{msg}</span>
      </div>
    );
  }
  render() {
    let absenMessageError;
    if (this.props.withAbsenMessageError && this.props.youAreLate) {
      absenMessageError = this.renderMessageAbsen("Sorry you're late");
    }
    else if(this.props.withAbsenMessageError && !this.props.youAreLate){
      absenMessageError = this.renderMessageAbsen("Have a Nice Day");
    }
    return (
      <div style={styles.contentTopCaption}>
        <h3>HELLO,</h3>
        <h1>{this.props.userFullName}</h1>
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
