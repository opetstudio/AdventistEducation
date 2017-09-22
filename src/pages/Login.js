
import React, { Component } from 'react';
import { Container, Form, Button, Loader, Message } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

// import { remote } from 'electron';
import {
  modificationUsernameSession,
  modificationPasswordSession,
  submitUsernamePasswordSession
 } from '../actions/LoginAction';
import { gotoSubAdminPage, setCurrentPagePath } from '../actions/AdminAction';
import LoginBox from '../containers/LoginBox';
import Header from '../containers/Header';
import KickInIfLogin from '../containers/KickInIfLogin';

import './Login.css';

const big_title = require('../img/big_title.png');
const button_with_right_arrow = require('../img/button_with_right_arrow.png');

// const windowRemote = remote.getCurrentWindow();

export default class Login extends Component {
  constructor(props) {
    super(props);
    console.log('');
  }
  componentWillMount() {
    console.log('props====>>>>>', this.props);
    this.setState({ redirect: false, pagePath: '/' });
    // this.props.setCurrentPagePath('/login');
    // console.log('list contacts via props==>', this.props.contacts);
  }
  componentWillReceiveProps(nextProps) {
    console.log('[Login.componentWillReceiveProps] ==>', nextProps);
    // this._setDataSource(nextProps.contacts);
  }
  gotoPage(pagePath) {
    // some action...
    // then redirect
    // if (this.props.appReducer.current_sub_admin_path !== pagePath) {
        // this.props.gotoSubAdminPage(pagePath);
        this.setState({ redirect: true, pagePath });
    // }
  }
  renderErrorMessage() {
    if (this.props.sessionReducer.loginErrorMessage !== '') {
      return (
        <Message negative>
          <p>{this.props.sessionReducer.loginErrorMessage}</p>
        </Message>
      );
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.pagePath} />;
    }
    return (
      <div>
        <KickInIfLogin />
        <Header currentPagePath='/login' adminTitle='LOGIN' />
        <div className="statusBarBacking" />
        <div className={'headerTitleWrapper'}>
            <img className={'img_bigtitle'} src={big_title} alt='' />
        </div>
        <Container>
          <div className={'loginBoxWrapper'}>
            <div className={'tanggalHariIniWrapper'}>
              <h1>{moment(new Date().getTime()).format('MMMM Do YYYY, h:mm:ss a')}</h1>
            </div>
            <LoginBox />
            <div className={'bottomButtonWrapper'}>
              <h1
                onClick={() => this.gotoPage('/absen')}
              >
                KE HALAMAN ABSEN
                <img
                  className={'img_button_with_right_arrow'}
                  src={button_with_right_arrow} alt=''
                />
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   // const users = _.map(state.dataUsersReducer.dataUsers, (val, uid) => {
//   //   console.log('');
//   //   return { ...val, uid };
//   // });
//   return {
//     appReducer: state.appReducer,
//     dataUsersReducer: state.dataUsersReducer,
//     sessionReducer: state.sessionReducer
//   };
// }
//
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     modificationUsernameSession,
//     modificationPasswordSession,
//     submitUsernamePasswordSession,
//     gotoSubAdminPage,
//     setCurrentPagePath
//   }, dispatch);
//
//   // return {
//   //   fetchData: () => dispatch(fetchData())
//   // };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login);
