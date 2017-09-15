import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfilePicture from '../components/ProfilePicture';
import ContentTopCaption from '../components/ContentTopCaption';
import ContentTopMenu from '../components/ContentTopMenu';
import * as AdminAction from '../actions/AdminAction';

import './ContentTop.css';

class ContentTop extends Component {
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
  render() {
    let profilePict;
    let contentTopMenu;
    if (this.props.withProfilePicture) {
      profilePict = <ProfilePicture photoBuffer={this.props.SettingReducer.noPhoto} />;
    }
    if (this.props.withContentTopMenu) {
      contentTopMenu = <ContentTopMenu />;
    }
    const fullName = this.props.userFullName || this.props.sessionReducer.username
    console.log(this.props.withProfilePicture);
    return (
      <div className={'contentTop'}>
        <div className={'profileInfoRight'}>
          {profilePict}
          <ContentTopCaption
            withAbsenMessageError={this.props.withAbsenMessageError}
            userFullName={fullName}
            youAreLate={this.props.youAreLate}
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
  return bindActionCreators(AdminAction, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentTop);
