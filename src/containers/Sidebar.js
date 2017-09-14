'use strict';
import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logOut } from '../actions/LoginAction';
import ProfilePicture from '../components/ProfilePicture';
import { gotoSubAdminPage } from '../actions/AdminAction';
import './Sidebar.css';


class Sidebar extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.setState({ redirect: false, pagePath: '/', activeItem: 'home' });
  // }
  componentWillMount() {
    // console.log('stateeeeee====>>', this.state);
     this.setState({
       redirect: false,
       pagePath: '/',
       activeItem: this.props.appReducer.current_sub_admin_path });
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
  renderSideMenu(activeItem) {
    return (
      <Menu inverted vertical style={{ background: '#232c33', borderRadius: 0 }}>
        <Menu.Item
          name='Dashboard'
          active={activeItem === '/admin'}
          onClick={() => this.gotoPage('/admin')}
          style={style.sideMenu}
        />
        <Menu.Item
          name='Profil Sekolah'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
          style={style.sideMenu}
        />
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
          name='Absen Digital'
          active={activeItem === '/absendigital'}
          onClick={() => this.gotoPage('/absendigital')}
          style={style.sideMenu}
        />
        <Menu.Item
          name='Pengaturan'
          active={activeItem === '/setting'}
          // onClick={() => this.props.gotoSubAdminPage('absendigital')}
          onClick={() => this.gotoPage('/setting')}
          style={style.sideMenu}
        />
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
    // console.log('proooooooop====>>', this);
    const { activeItem } = this.state;
    // console.log('activeItem====>', activeItem);
    if (this.state.redirect) {
      return <Redirect push to={this.state.pagePath} />;
    }
    let sidebarContent;
    let backButton;
    if (this.props.profilePictOnly) {
        sidebarContent = <ProfilePicture widthPicture={this.props.widthPicture} />;
        backButton = (
          <Button
              fluid
              onClick={() => this.gotoPage('/login')}
              style={{ position: 'absolute', bottom: 50 }}
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
    appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logOut, gotoSubAdminPage
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
