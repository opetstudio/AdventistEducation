import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormInputPopUp from '../components/FormInputPopUp';
import FormInputSiswa from '../components/FormInputSiswa';

import {
  saveDataSiswa,
  updateDataSiswa,
  closeModalForm,
  openModalForm,
  onChangeInputPhoto
} from '../actions/DataSiswaAction';

const photoProfile = require('../img/photoProfile.png');

class FormInputSiswaPopUpContainer extends Component {
  constructor(props) {
    super(props);
    this._onClickButtonSaveData = this._onClickButtonSaveData.bind(this);
    this._onClickButtonUpdateData = this._onClickButtonUpdateData.bind(this);
    this._onClickButtonTrigger = this._onClickButtonTrigger.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this._onChangeInputPhoto = this._onChangeInputPhoto.bind(this);
  }
  componentWillMount() {
    // console.log('FormInputSiswaPopUp.componentWillMount props==>', this.props);
    //
    this.setState({
      neDBDataPath: this.props.SettingReducer.neDBDataPath,
      // imgSrc: '',
      open: this.props.DataSiswaReducer.formModalOpen,
      isFormError: this.props.DataSiswaReducer.isFormModalError,
      isFormModalSuccess: this.props.DataSiswaReducer.isFormModalSuccess,
      formMessage: this.props.DataSiswaReducer.formSiswaMessage,
      detailData: this.props.DataSiswaReducer.dataDetail,
      detailPhotoBuffer: this.props.DataSiswaReducer.detailPhotoBuffer
    });
    this.props.closeModalForm();
  }
  componentWillReceiveProps(nextProps) {
    // console.log('FormInputSiswaPopUp componentWillReceiveProps ', nextProps);
    this.setState({
      neDBDataPath: nextProps.SettingReducer.neDBDataPath,
      // imgSrc: '',
      open: nextProps.DataSiswaReducer.formModalOpen,
      isFormError: nextProps.DataSiswaReducer.isFormModalError,
      isFormModalSuccess: nextProps.DataSiswaReducer.isFormModalSuccess,
      formMessage: nextProps.DataSiswaReducer.formSiswaMessage,
      detailData: nextProps.DataSiswaReducer.dataDetail,
      detailPhotoBuffer: nextProps.DataSiswaReducer.detailPhotoBuffer
    });
    if (nextProps.DataSiswaReducer.formModalOpen) {
      //load message
    }
  }
  _onClickButtonSaveData(data, callback) {
    // if (this.props.isCreateNew) {
        this.props.saveDataSiswa(data, this.state.neDBDataPath, callback);
    // }
  }
  _onClickButtonUpdateData(_id, oldData, data) {
    // if (this.props.isCreateNew) {
    this.props.updateDataSiswa(
      _id,
      oldData,
      data,
      this.state.neDBDataPath
    );
    // }
  }
  _onClickButtonTrigger() {
    this.props.openModalForm();
    // this.props.onClickCreateSiswa();
    // this.setState({
    //   detailData: {},
    //   open: true
    // });
  }
  _onCloseModal() {
    this.props.closeModalForm();
  }
  _onChangeInputPhoto(photoPath) {
    this.props.onChangeInputPhoto(photoPath);
  }
  render() {
    // console.log('FormInputSiswaPopUp Render props', this.props);
    // console.log('FormInputSiswaPopUp Render state', this.state);
    let imgSrc = this.state.detailPhotoBuffer;
    if (this.state.detailPhotoBuffer === '') {
      imgSrc = photoProfile;
    }

    return (
      <FormInputPopUp
        buttonTitle="Input Data Siswa"
        open={this.state.open}
        onClickButtonTrigger={this._onClickButtonTrigger}
        // onCloseModalFormInputSiswa={this.props.onCloseModalFormInputSiswa}
        imgSrc={imgSrc}
        onCloseModal={this._onCloseModal}
      >
        <FormInputSiswa
          onClickButtonSaveData={this._onClickButtonSaveData}
          onClickButtonUpdateData={this._onClickButtonUpdateData}
          // isCreateNew={this.props.isCreateNew}
          isFormModalSuccess={this.state.isFormModalSuccess}
          isFormError={this.state.isFormError}
          formMessage={this.state.formMessage}
          detailData={this.state.detailData}
          onChangeInputPhoto={this._onChangeInputPhoto}
          // onUpdateSiswaSuccess={this.props.onUpdateSiswaSuccess}
          alt="tes"
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
    DataSiswaReducer: state.DataSiswaReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveDataSiswa,
    updateDataSiswa,
    closeModalForm,
    openModalForm,
    onChangeInputPhoto
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormInputSiswaPopUpContainer);
