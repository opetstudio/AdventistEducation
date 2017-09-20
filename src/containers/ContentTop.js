import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfilePicture from '../components/ProfilePicture';
import ContentTopCaption from '../components/ContentTopCaption';
import ContentTopMenu from '../components/ContentTopMenu';
import * as AdminAction from '../actions/AdminAction';
import { setAbsenMode } from '../actions/SettingAction';

import './ContentTop.css';

const no_photo = require('../img/no_photo.png');

class ContentTop extends Component {
  constructor(props){
    super(props)
    this._onClickSubmenu = this._onClickSubmenu.bind(this);
  }
  componentWillMount() {
    // this.setState({
    //   menuVerticalLeftVisibility: 'hidden',
    //   menuVerticalRightVisibility: 'hidden'
    // });
    // this.props.modificationTitleAdmin('HALAMAN ADMIN');
    // console.log('admin page componentWillMount props====>>>>>', this.props);
    // this.props.modificationTitleAdmin('ABSENSI DIGITAL');
    // console.log('list contacts via props==>', this.props.contacts);
  }
  _onClickSubmenu(submenu){
      if(submenu === 'set-absen-mode-to-checkout') this.props.setAbsenMode(2);
      if(submenu === 'set-absen-mode-to-checkin') this.props.setAbsenMode(1);

      this.props.onClickSubmenu(submenu);
  }
  render() {
    let profilePict;
    let contentTopMenu;
    if (this.props.withProfilePicture) {
      profilePict = <ProfilePicture photoBuffer={this.props.sessionReducer.detailPhotoBuffer} />;
    }
    if (this.props.withContentTopMenu) {
      contentTopMenu = <ContentTopMenu onClickSubmenu={this._onClickSubmenu} />;
    }
    const fullName = this.props.userFullName || this.props.sessionReducer.userDetail.name;
    console.log(this.props.withProfilePicture);
    return (
      <div className={'contentTop'}>
        <div className={'profileInfoRight'}>
          {profilePict}
          <ContentTopCaption
            withAbsenMessageError={this.props.withAbsenMessageError}
            userFullName={fullName}
            youAreLate={this.props.youAreLate}
            usersessionDetail={this.props.sessionReducer.userDetail}
          />
        </div>
        {contentTopMenu}
      </div>
    );
  }
}

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
  return bindActionCreators(
    { ...AdminAction, setAbsenMode },
    dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentTop);
