import React, { Component } from 'react';
// import { Container, Form, Button, Loader, Message } from 'semantic-ui-react';
// import { Link, Redirect } from 'react-router-dom';
// import moment from 'moment';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import * as AdminAction from '../actions/AdminAction';
import ContentTop from '../containers/ContentTop';

// import { remote } from 'electron';
import Header from '../containers/Header';
import Sidebar from '../containers/Sidebar';
import AbsenListenerContainer from '../containers/AbsenListenerContainer';
// import RedirectIfNotLogin from '../components/RedirectIfNotLogin/RedirectIfNotLogin';
// import ContentTopMenu from '../components/ContentTopMenu';
// import ContentTopCaption from '../components/ContentTopCaption';
import AbsenDateTime from '../components/AbsenDateTime';

import './Absen.css';
// import '../stylesheets/containers/ContentTop.css';

export default class Absen extends Component {
  constructor(props) {
    super(props);
    // this.setState({
    //   menuVerticalLeftVisiblity: 'hidden'
    // });
    // console.log('');
    this._onCatchDataUser = this._onCatchDataUser.bind(this);
  }
  componentWillMount() {
    this.setState({
      menuVerticalLeftVisibility: 'hidden',
      menuVerticalRightVisibility: 'hidden',
      dataDetail: {},
      photoBuffer: '',
      youAreLate: false
    });
    // console.log('absen digital componentWillMount props====>>>>>', this.props);
    // console.log('list contacts via props==>', this.props.contacts);
  }
  _onCatchDataUser(dataDetail, photoBuffer) {
    console.log('onCatchDataUser', dataDetail);
    let youAreLate = false;
    if (dataDetail.id) {
      const now = new Date().getHours();
      if (now > 7 && now < 12) youAreLate = true;
      console.log('jammmmm ', now);
    } else console.log('tiiiddakkk adddddaaaaaaaaaaa=====>>>');
    this.setState({
      dataDetail,
      photoBuffer,
      youAreLate
    });
  }
  // componentWillReceiveProps(nextProps) {
  //   // this.state = {
  //   //     ...this.state
  //   // };
  // }

  render() {
    console.log('props di halaman digital absen==>', this.props);
    const firstName = this.state.dataDetail.name || '';
    const lastName = this.state.dataDetail.last_name || '';
    const userFullName = `${firstName} ${lastName}`;

    return (
      <div>
        <Header
          currentPagePath='/absen'
          adminTitle='ABSEN DIGITAL'
        />
        <Sidebar
          profilePictOnly
          widthPicture={'100%'}
          photoBuffer={this.state.photoBuffer}
        />
        <div className={'containerWrapper'}>
          <ContentTop
            withProfilePicture={false}
            withContentTopMenu={false}
            withAbsenMessageError
            userFullName={userFullName}
            youAreLate={this.state.youAreLate}
          />
          <AbsenDateTime />
          <div className='absenListenerWrapper'>
            <AbsenListenerContainer
              onCatchDataUser={this._onCatchDataUser}
            />
          </div>
        </div>
      </div>
    );
  }
}
