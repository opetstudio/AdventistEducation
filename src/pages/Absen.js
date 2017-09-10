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
import AbsenListener from '../containers/AbsenListener';
// import RedirectIfNotLogin from '../components/RedirectIfNotLogin/RedirectIfNotLogin';
// import ContentTopMenu from '../components/ContentTopMenu';
// import ContentTopCaption from '../components/ContentTopCaption';
import AbsenDateTime from '../components/AbsenDateTime';

import './Absen.css';
// import '../stylesheets/containers/ContentTop.css';

export default class Absen extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.setState({
  //   //   menuVerticalLeftVisiblity: 'hidden'
  //   // });
  //   // console.log('');
  // }
  componentWillMount() {
    this.setState({
      menuVerticalLeftVisibility: 'hidden',
      menuVerticalRightVisibility: 'hidden'
    });
    // console.log('absen digital componentWillMount props====>>>>>', this.props);
    // console.log('list contacts via props==>', this.props.contacts);
  }
  // componentWillReceiveProps(nextProps) {
  //   // this.state = {
  //   //     ...this.state
  //   // };
  // }

  render() {
    console.log('props di halaman digital absen==>', this.props);
    // console.log('render');
    return (
      <div>
        <Header currentPagePath='/absen' adminTitle='ABSEN DIGITAL' />
        <Sidebar profilePictOnly widthPicture={'100%'} />
        <div className={'containerWrapper'}>
          <ContentTop withProfilePicture={false} withContentTopMenu={false} withAbsenMessageError />
          <AbsenDateTime />
          <div className='absenListenerWrapper'>
            <AbsenListener />
          </div>
        </div>
      </div>
    );
  }
}
