import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormInputPopUp from '../components/FormInputPopUp';
import UserForm from '../components/UserForm';

import {
  createData,
  updateData,
  closeModalForm,
  openModalForm,
  onChangeInputPhoto,
  deleteData
} from '../actions/UserAction';

const photoProfile = require('../img/photoprofile.png');

class UserFormpopupContainer extends Component {
  constructor(props) {
    super(props);
    this._onClickButtonSaveData = this._onClickButtonSaveData.bind(this);
    this._onClickButtonUpdateData = this._onClickButtonUpdateData.bind(this);
    this._onClickButtonTrigger = this._onClickButtonTrigger.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this._onChangeInputPhoto = this._onChangeInputPhoto.bind(this);
    this._onClickButtonDeleteData = this._onClickButtonDeleteData.bind(this);
  }
  componentWillMount() {
    this.setState({
      neDBDataPath: this.props.SettingReducer.neDBDataPath,
      // imgSrc: '',
      open: this.props.UserReducer.formModalOpen,
      isFormError: this.props.UserReducer.isFormModalError,
      isFormModalSuccess: this.props.UserReducer.isFormModalSuccess,
      formMessage: this.props.UserReducer.formMessage,
      detailData: this.props.UserReducer.dataDetail,
      detailPhotoBuffer: this.props.UserReducer.detailPhotoBuffer
    });
    this.props.closeModalForm();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      neDBDataPath: nextProps.SettingReducer.neDBDataPath,
      // imgSrc: '',
      open: nextProps.UserReducer.formModalOpen,
      isFormError: nextProps.UserReducer.isFormModalError,
      isFormModalSuccess: nextProps.UserReducer.isFormModalSuccess,
      formMessage: nextProps.UserReducer.formMessage,
      detailData: nextProps.UserReducer.dataDetail,
      detailPhotoBuffer: nextProps.UserReducer.detailPhotoBuffer
    });
    if (nextProps.UserReducer.formModalOpen) {
      //load message
    }
  }
  _onClickButtonSaveData(data) {
    this.props.createData(data, this.state.neDBDataPath);
  }
  _onClickButtonUpdateData(_id, oldData, newData) {
    this.props.updateData(_id, oldData, newData, this.state.neDBDataPath);
  }
  _onClickButtonDeleteData(oldData) {
    this.props.deleteData(oldData, this.state.neDBDataPath);
  }
  _onClickButtonTrigger() {
    this.props.openModalForm();
  }
  _onCloseModal() {
    this.props.closeModalForm();
  }
  _onChangeInputPhoto(photoPath) {
    this.props.onChangeInputPhoto(photoPath);
  }
  render() {
    let imgSrc = this.state.detailPhotoBuffer;
    if (this.state.detailPhotoBuffer === '') {
      imgSrc = photoProfile;
    }

    return (
      <FormInputPopUp
        buttonTitle="Input Data"
        open={this.state.open}
        onClickButtonTrigger={this._onClickButtonTrigger}
        imgSrc={imgSrc}
        onCloseModal={this._onCloseModal}
      >
        <UserForm
          onClickButtonSaveData={this._onClickButtonSaveData}
          onClickButtonUpdateData={this._onClickButtonUpdateData}
          onClickButtonDeleteData={this._onClickButtonDeleteData}
          // isCreateNew={this.props.isCreateNew}
          isFormModalSuccess={this.state.isFormModalSuccess}
          isFormError={this.state.isFormError}
          formMessage={this.state.formMessage}
          detailData={this.state.detailData}
          onChangeInputPhoto={this._onChangeInputPhoto}
          usersessionDetail={this.props.sessionReducer.userDetail}
        />
      </FormInputPopUp>
    );
  }
}

function mapStateToProps(state) {
  // const users = _.map(state.dataUsersReducer.dataUsers, (val, uid) => {
  //   console.log('');
  //   return { ...val, uid };
  // });
  return {
    SettingReducer: state.SettingReducer,
    UserReducer: state.UserReducer,
    sessionReducer: state.sessionReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createData,
    updateData,
    closeModalForm,
    openModalForm,
    onChangeInputPhoto,
    deleteData
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFormpopupContainer);
