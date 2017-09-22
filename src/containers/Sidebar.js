'use strict';
import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logOut } from '../actions/LoginAction';
import { settingSetNoPhoto } from '../actions/SettingAction';
import ProfilePicture from '../components/ProfilePicture';
import { gotoSubAdminPage } from '../actions/AdminAction';
import './Sidebar.css';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    // this.setState({ redirect: false, pagePath: '/', activeItem: 'home' });
    this.gotoPage = this.gotoPage.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderSideMenu = this.renderSideMenu.bind(this);
    this._renderMenuEditProfile = this._renderMenuEditProfile.bind(this);
  }
  componentWillMount() {
    console.log('sidebar.js componentWillMount ====>>', this.props.SettingReducer);
     this.setState({
       noPhoto: this.props.SettingReducer.photo_profile,
       redirect: false,
       pagePath: '/',
       activeItem: this.props.appReducer.current_sub_admin_path });
       if (this.props.profilePictOnly) this.props.settingSetNoPhoto();
  }
  componentWillReceiveProps(nextProps) {
    console.log('sidebar.js componentWillReceiveProps ====>>', nextProps.SettingReducer);
    this.setState({
      noPhoto: nextProps.SettingReducer.photo_profile });
  }
  handleItemClick() {

  }
  gotoPage(pagePath) {
    // some action...
    // then redirect
    if (this.props.appReducer.current_sub_admin_path !== pagePath) {
        this.props.gotoSubAdminPage(pagePath);
        this.setState({ redirect: true, pagePath, activeItem: pagePath });
    }
  }
  _renderMenuEditProfile(activeItem) {
    if(this.props.sessionReducer.userDetail.username=== 'root'){
      return (
        <div />
      );
    }
    else
      return (
        <Menu.Item
          name='Pengaturan Profile'
          active={activeItem === '/edit-profile'}
          // onClick={() => this.props.gotoSubAdminPage('absendigital')}
          onClick={() => this.gotoPage('/edit-profile')}
          style={style.sideMenu}
        />
      );
  }
  renderSideMenu(activeItem) {
    return (
      <Menu inverted vertical style={{ background: '#232c33', borderRadius: 0 }}>
        <Menu.Item
          name='Dashboard'
          active={activeItem === '/admin'}
          onClick={() => this.gotoPage('/admin')}
          style={style.sideMenu}
        />
        {/* <Menu.Item
          name='Profil Sekolah'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
          style={style.sideMenu}
        /> */}
        <Menu.Item
          name='Profil Guru'
          active={activeItem === '/daftar-gurustaff'}
          onClick={() => this.gotoPage('/daftar-gurustaff')}
          style={style.sideMenu}
        />
        {/* <Menu.Item
          name='Profil Siswa'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
          style={style.sideMenu}
        /> */}
        <Menu.Item
          name='Profil Siswa'
          active={activeItem === '/daftar-siswa'}
          onClick={() => this.gotoPage('/daftar-siswa')}
          style={style.sideMenu}
        />
        <Menu.Item
          name='Profil User'
          active={activeItem === '/daftar-user'}
          onClick={() => this.gotoPage('/daftar-user')}
          style={style.sideMenu}
        />
        <Menu.Item
          name='Absen Digital'
          active={activeItem === '/absendigital'}
          onClick={() => this.gotoPage('/absendigital')}
          style={style.sideMenu}
        />
        <Menu.Item
          name='Pengaturan Sistem'
          active={activeItem === '/setting'}
          // onClick={() => this.props.gotoSubAdminPage('absendigital')}
          onClick={() => this.gotoPage('/setting')}
          style={style.sideMenu}
        />
        {this._renderMenuEditProfile()}
        <Menu.Item
          name='Logout'
          active={activeItem === 'friends'}
          onClick={() => this.props.logOut()}
          style={style.sideMenu}
        />
      </Menu>
    );
  }

  render() {
    // console.log('Sidebar.js proooooooop====>>', this.props.SettingReducer);
    // let photoProfile = this.state.noPhoto;
    // if (this.props.photoBuffer && this.props.photoBuffer !== '') {
    //     photoProfile = this.props.photoBuffer;
    // }
    const { activeItem } = this.state;
    // console.log('activeItem====>', activeItem);

    // let photo = this.state.noPhoto;
    // if (this.props.photoBuffer && this.props.photoBuffer !== '') {
    //   photo = this.props.photoBuffer;
    // }

    if (this.state.redirect) {
      return <Redirect push to={this.state.pagePath} />;
    }
    let sidebarContent;
    let backButton;
    if (this.props.profilePictOnly) {
        sidebarContent = (
            <ProfilePicture
              widthPicture={this.props.widthPicture}
              photoBuffer={this.props.photoBuffer}
            />
          );
        backButton = (
          <Button
              fluid
              onClick={() => this.gotoPage('/login')}
              style={{ position: 'absolute', bottom: 50, left: '10%', width: '80%' }}
          >
            Back
          </Button>
        );
    } else {
        sidebarContent = this.renderSideMenu(activeItem);
    }
    return (
      <div className={'sideBarWrapper'} style={{ position: 'relative' }}>
        {sidebarContent}
        {backButton}
      </div>
    );
  }
}

const style = {
  sideMenu: {
    borderRadius: 0, color: '#96a1a8 !important'
  }
};

function mapStateToProps(state) {
  // const users = _.map(state.dataUsersReducer.dataUsers, (val, uid) => {
  //   console.log('');
  //   return { ...val, uid };
  // });
  return {
    dataUsersReducer: state.dataUsersReducer,
    sessionReducer: state.sessionReducer,
    appReducer: state.appReducer,
    SettingReducer: state.SettingReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logOut,
    gotoSubAdminPage,
    settingSetNoPhoto
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
