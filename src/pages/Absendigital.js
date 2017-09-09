import React, { Component } from 'react';
// import { Container, Form, Button, Loader, Message } from 'semantic-ui-react';
// import { Link, Redirect } from 'react-router-dom';
// import moment from 'moment';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import * as AdminAction from '../actions/AdminAction';

// import { remote } from 'electron';
import Header from '../containers/Header';
import Sidebar from '../containers/Sidebar';
import LiveReportSiswa from '../containers/LiveReportSiswa';
import LiveReportGuru from '../containers/LiveReportGuru';
import ContentTop from '../containers/ContentTop';
import KickOutIfNotLogin from '../containers/KickOutIfNotLogin';
import '../global.css';
// import '../stylesheets/pages/login/Login.css';

export default class Absendigital extends Component {
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
    // this.props.setCurrentPagePath('/absendigital');
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

    // if (this.props.appReducer.current_sub_admin_path !== 'absendigital') {
    //   return <Redirect to={`/${this.props.appReducer.current_sub_admin_path}`} />;
    // }
    // console.log('render');
    return (
      <div>
        <KickOutIfNotLogin />
        <Header currentPagePath='/absendigital' adminTitle='ABSENSI DIGITAL' />
        <Sidebar />
        <div className={'containerWrapper'}>
          <ContentTop withProfilePicture withContentTopMenu />
          <div className='liveReportAbsensiWrapper'>
            <LiveReportSiswa />
            <LiveReportGuru />
          </div>
        </div>
      </div>
    );
  }
}
