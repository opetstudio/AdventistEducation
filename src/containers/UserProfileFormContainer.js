import React, { Component } from 'react';
import { Image, Button, Form, Input, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateUserProfile, updateData, openFormUpdateData} from '../actions/UserAction';
import UserForm from '../components/UserForm';
import './UserProfileFormContainer.css';

const photoProfile = require('../img/no_photo.png');

class UserProfileFormContainer extends Component {
  constructor(props) {
    super(props);
    this._onClickButtonUpdateData = this._onClickButtonUpdateData.bind(this);
    console.log('');
  }
  componentWillMount() {
    this.props.openFormUpdateData(this.props.sessionReducer.userDetail);
    this.setState({
      isSuccess: this.props.UserReducer.isFormModalSuccess,
      isError: this.props.UserReducer.isFormModalError,
      formMessage: this.props.UserReducer.formMessage,
      userDetail: this.props.sessionReducer.userDetail,
      imgSrc: this.props.UserReducer.detailPhotoBuffer
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      isSuccess: nextProps.UserReducer.isFormModalSuccess,
      isError: nextProps.UserReducer.isFormModalError,
      formMessage: nextProps.UserReducer.formMessage,
      userDetail: nextProps.sessionReducer.userDetail,
      imgSrc: nextProps.UserReducer.detailPhotoBuffer
    });
  }
  _onClickButtonUpdateData(_id, oldData, newData) {
    // console.log('_onClickButtonUpdateData _id=>', _id);
    // console.log('_onClickButtonUpdateData oldData=>', oldData);
    // console.log('_onClickButtonUpdateData newData=>', newData);
    this.props.updateData(_id, oldData, newData, this.props.SettingReducer.neDBDataPath, true);
  }
  render() {
    return (
      <div className='userProfileFormContainerWrapper'>
        <div className='userProfileFormContainerUserFormWrapper'>
          <UserForm
            onClickButtonSaveData={() => {}}
            onClickButtonUpdateData={this._onClickButtonUpdateData}
            onClickButtonDeleteData={() => {}}
            // isCreateNew={this.props.isCreateNew}
            isFormModalSuccess={this.state.isSuccess}
            isFormError={this.state.isError}
            formMessage={this.state.formMessage}
            detailData={this.state.userDetail}
            usersessionDetail={this.props.sessionReducer.userDetail}
            isUpdateProfile={true}
          />
        </div>
        <div className='userProfileFormContainerPhotoDisplayWrapper'>
          <Image
            id="imgDisplay"
            wrapped
            src={this.state.imgSrc}
          />
        </div>
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
    UserReducer: state.UserReducer,
    SettingReducer: state.SettingReducer,
    sessionReducer: state.sessionReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUserProfile,
    updateData,
    openFormUpdateData
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileFormContainer);
