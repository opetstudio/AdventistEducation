import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

// import ContentTop from '../containers/ContentTop';
// import * as AdminAction from '../actions/AdminAction';

// import { remote } from 'electron';
import Header from '../containers/Header';
import Sidebar from '../containers/Sidebar';
// import RedirectIfNotLogin from '../containers/RedirectIfNotLogin';
import KickOutIfNotLogin from '../containers/KickOutIfNotLogin';
import SiswaListData from '../containers/SiswaListData';
import FormInputSiswaPopUpContainer from '../containers/FormInputSiswaPopUpContainer';
import './Setting.css';
// import '../stylesheets/pages/login/Login.css';

// const photoProfile = require('../img/photoProfile.png');

export default class DaftarSiswa extends Component {
  render() {
    return (
      <div>
        <KickOutIfNotLogin />
        <Header currentPagePath='/daftar-siswa' adminTitle='DAFTAR SISWA' />
        <Sidebar />
        <div className={'containerWrapper'}>
          {/* <ContentTop withProfilePicture withContentTopMenu /> */}
          <div className='ContentWrapper'>
            <Divider />
            <FormInputSiswaPopUpContainer />
            <Divider />
            <SiswaListData />
          </div>
        </div>
      </div>
    );
  }
}
