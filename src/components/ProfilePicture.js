import React, { Component } from 'react';

import './ProfilePicture.css';

const photoProfile = require('../img/no_photo.png');


export default class ProfilePicture extends Component {
  // constructor(props) {
  //   super(props);
  //   // this._handleError = this._handleError.bind(this);
  //
  // }
  componentWillMount() {
    this.setState({
      photo: this.props.photoBuffer
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
    //   imgSrcOrigin: photoProfile,
      photo: nextProps.photoBuffer
    });
  }
  // _handleError(e) {
  //   console.log('=====>>>>>>e: ', e.target.src);
  //   this.setState({
  //     photo: photoProfile
  //   });
  // }
  render() {
    console.log('[ProfilePicture] render photoprofile,', this.props);
    // let photo = photoProfile;
    // if (this.props.photoBuffer && this.props.photoBuffer !== '') {
    //   photo = this.props.photoBuffer;
    // }
    return (
      <div className={'profilePictureWrapper'} style={{ width: this.props.widthPicture }}>
        <img
          src={photoProfile}
          style={{ width: this.props.widthPicture }}
          alt=""
        />
      </div>
    );
  }
}
