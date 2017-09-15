import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormInputPopUp from '../components/FormInputPopUp';
import GurustaffForm from '../components/GurustaffForm';

import {
  createData,
  updateData,
  closeModalForm,
  openModalForm,
  onChangeInputPhoto,
  deleteData
} from '../actions/GurustaffAction';

const photoProfile = require('../img/photoProfile.png');

class GurustaffFormpopupContainer extends Component {
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
      open: this.props.GurustaffReducer.formModalOpen,
      isFormError: this.props.GurustaffReducer.isFormModalError,
      isFormModalSuccess: this.props.GurustaffReducer.isFormModalSuccess,
      formMessage: this.props.GurustaffReducer.formMessage,
      detailData: this.props.GurustaffReducer.dataDetail,
      detailPhotoBuffer: this.props.GurustaffReducer.detailPhotoBuffer
    });
    this.props.closeModalForm();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      neDBDataPath: nextProps.SettingReducer.neDBDataPath,
      // imgSrc: '',
      open: nextProps.GurustaffReducer.formModalOpen,
      isFormError: nextProps.GurustaffReducer.isFormModalError,
      isFormModalSuccess: nextProps.GurustaffReducer.isFormModalSuccess,
      formMessage: nextProps.GurustaffReducer.formMessage,
      detailData: nextProps.GurustaffReducer.dataDetail,
      detailPhotoBuffer: nextProps.GurustaffReducer.detailPhotoBuffer
    });
    if (nextProps.GurustaffReducer.formModalOpen) {
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
        <GurustaffForm
          onClickButtonSaveData={this._onClickButtonSaveData}
          onClickButtonUpdateData={this._onClickButtonUpdateData}
          onClickButtonDeleteData={this._onClickButtonDeleteData}
          // isCreateNew={this.props.isCreateNew}
          isFormModalSuccess={this.state.isFormModalSuccess}
          isFormError={this.state.isFormError}
          formMessage={this.state.formMessage}
          detailData={this.state.detailData}
          onChangeInputPhoto={this._onChangeInputPhoto}
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
    GurustaffReducer: state.GurustaffReducer
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
)(GurustaffFormpopupContainer);
