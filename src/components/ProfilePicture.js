import React, { Component } from 'react';

import './ProfilePicture.css';

const photoProfile = require('../img/photoProfile.png');

export default class ProfilePicture extends Component {
  render() {
    return (
      <div className={'profilePictureWrapper'} style={{ width: this.props.widthPicture }}>
        <img src={photoProfile} alt='' style={{ width: this.props.widthPicture }} />
      </div>
    );
  }
}
