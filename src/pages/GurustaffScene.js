import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

// import ContentTop from '../containers/ContentTop';
// import * as AdminAction from '../actions/AdminAction';

// import { remote } from 'electron';
import Header from '../containers/Header';
import Sidebar from '../containers/Sidebar';
// import RedirectIfNotLogin from '../containers/RedirectIfNotLogin';
import KickOutIfNotLogin from '../containers/KickOutIfNotLogin';
import GurustaffListDataContainer from '../containers/GurustaffListDataContainer';
import GurustaffFormpopupContainer from '../containers/GurustaffFormpopupContainer';
import GurustaffExportxlsxContainer from '../containers/GurustaffExportxlsxContainer';
import GurustaffExportpdfContainer from '../containers/GurustaffExportpdfContainer';
import './Setting.css';
// import '../stylesheets/pages/login/Login.css';

// const photoProfile = require('../img/photoProfile.png');

export default class GurustaffScene extends Component {
  render() {
    return (
      <div>
        <KickOutIfNotLogin />
        <Header currentPagePath='/daftar-gurustaff' adminTitle='PROFILE GURU DAN STAFF' />
        <Sidebar />
        <div className={'containerWrapper'}>
          {/* <ContentTop withProfilePicture withContentTopMenu /> */}
          <div className='ContentWrapper'>
            <Divider />
            <ul className="sceneButtonMenu">
              <li><GurustaffFormpopupContainer /></li>
              <li><GurustaffExportxlsxContainer /></li>
              <li><GurustaffExportpdfContainer /></li>
            </ul>
            <Divider />
            <GurustaffListDataContainer />
          </div>
        </div>
      </div>
    );
  }
}
