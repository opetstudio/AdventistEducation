import React, { Component } from 'react';
import { Button, Form, Message, Confirm, Dropdown } from 'semantic-ui-react';

import { kelasOptions } from '../common';

const FIELDS = {
  name: '',
  last_name: '',
  kelas: '',
  nis: '',
  id: '',
  _id: '',
  photo: '',
  new_photo_path: ''
};
const FIELDS_ERROR_FLAG = {
  name_error: false,
  last_name_error: false,
  kelas_error: false,
  nis_error: false,
  id_error: false
};
const INITIAL_STATE = {
  ...FIELDS,
  ...FIELDS_ERROR_FLAG,
  detailData: {},
  newData: {},
  isFormOk: true,
  isSuccess: false,
  isError: false,
  formMessage: 'Masukan data dengan baik dan benar.',
  photo_path: '',
  openConfirmDelete: false
};


export default class FormInputSiswa extends Component {
  constructor(props) {
    super(props);
    this._onChangeInputText = this._onChangeInputText.bind(this);
    this._onClickButtonSaveData = this._onClickButtonSaveData.bind(this);
    this._onClickButtonUpdateData = this._onClickButtonUpdateData.bind(this);
    this._saveDataResponse = this._saveDataResponse.bind(this);
    this._checkField = this._checkField.bind(this);
    this._setError = this._setError.bind(this);
    this._setDataDetail = this._setDataDetail.bind(this);
    this._renderButtonSubmit = this._renderButtonSubmit.bind(this);
    this._resetState = this._resetState.bind(this);
    this._onChangeInputPhoto = this._onChangeInputPhoto.bind(this);

    this._onClickButtonDeleteData = this._onClickButtonDeleteData.bind(this);
    this._openConfirmDelete = this._openConfirmDelete.bind(this);
    this._onCancelConfirmDelete = this._onCancelConfirmDelete.bind(this);
    this._onOkConfirmDelete = this._onOkConfirmDelete.bind(this);
  }
  componentWillMount() {
    this._resetState();
    this._setDataDetail(this.props.detailData);
    this.setState({
      formMessage: this.props.formMessage,
      isSuccess: this.props.isFormModalSuccess,
      isError: this.props.isFormError
    });
  }
  componentWillReceiveProps(nextProps) {
    this._resetState();
    this._setDataDetail(nextProps.detailData);
    this.setState({
      formMessage: nextProps.formMessage,
      isSuccess: nextProps.isFormModalSuccess,
      isError: nextProps.isFormError
    });
  }
  _resetState() {
    this.setState(INITIAL_STATE);
  }
  _setDataDetail(dataDetail) {
    if (dataDetail) {
      this.setState({
        detailData: dataDetail,
        newData: {},
        name: dataDetail.name,
        name_error: false,
        last_name: dataDetail.last_name,
        last_name_error: false,
        kelas: dataDetail.kelas,
        kelas_error: false,
        nis: dataDetail.nis,
        nis_error: false,
        id: dataDetail.id,
        _id: dataDetail._id,
        photo: dataDetail.photo,
        new_photo_path: dataDetail.new_photo_path
        // photo_path: dataDetail.photo_path,
      });
    }
  }
  _onChangeInputText(key, value) {
    switch (key) {
      case 'name': this.setState({ name: value, name_error: false }); break;
      case 'last_name': this.setState({ last_name: value, last_name_error: false }); break;
      case 'kelas': this.setState({ kelas: value, kelas_error: false }); break;
      case 'nis': this.setState({ nis: value, nis_error: false }); break;
      case 'id': this.setState({ id: value, id_error: false }); break;
      case 'photo':
          this.setState({ photo: value.name, photo_path: value.path });
      break;
      default:
        return true;
    }
  }
  _checkField(isFormOk, newData, fieldKey, fieldValue, fieldName) {
    if (!isFormOk) {
      return false;
    } else if (fieldValue && fieldValue.length > 0) {
      newData[fieldKey] = fieldValue;
      return true;
    }
        this._setError(fieldName, fieldKey);
        return false;
  }
  _thisCheckMandatory(newData) {
    let isFormOk = true;
    isFormOk = this._checkField(isFormOk, newData, 'name', this.state.name, 'NAMA');
    isFormOk = this._checkField(isFormOk, newData, 'last_name',
                                this.state.last_name, 'NAMA AKHIR');
    isFormOk = this._checkField(isFormOk, newData, 'kelas', this.state.kelas, 'KELAS');
    isFormOk = this._checkField(isFormOk, newData, 'nis', this.state.nis, 'NIS');
    isFormOk = this._checkField(isFormOk, newData, 'id', this.state.id, 'ID');
    return isFormOk;
  }
  _onClickButtonSaveData() {
    const newData = {};
    let isFormOk = true;
    const createdon = new Date().getTime();
    newData.modifiedon = createdon;
    console.log('this.props===>', this.props);
      newData.createdon = createdon;
      isFormOk = this._thisCheckMandatory(newData);
      if (this.state.photo_path !== '') {
        newData.photo = this.state.photo;
        newData.photo_path = this.state.photo_path;
      } else {
        newData.photo_path = '';
      }

    if (isFormOk) {
        this.setState({
          newData
        });
        this.props.onClickButtonSaveData(newData, this._saveDataResponse);
    }
  }
  _onClickButtonDeleteData() {
    this._openConfirmDelete();
  }
  _openConfirmDelete() {
    this.setState({ openConfirmDelete: true });
  }
  _onCancelConfirmDelete() {
    this.setState({ openConfirmDelete: false });
  }
  _onOkConfirmDelete() {
    // this.setState({ openConfirmDelete: false });
    this.props.onClickButtonDeleteData(this.state.detailData);
  }
  _onClickButtonUpdateData() {
    const newData = {};
    let isFormOk = true;
    const createdon = new Date().getTime();
    newData.modifiedon = createdon;
    // console.log('this.props===>', this.props);
    isFormOk = this._thisCheckMandatory(newData);
    // newData._id = this.state._id;
    newData.photo = this.state.photo;
    if (this.state.photo_path !== '') {
      newData.photo = this.state.photo;
      newData.photo_path = this.state.photo_path;
    } else {
      newData.photo_path = '';
    }
    if (isFormOk) {
        this.setState({
          newData
        });
        this.props.onClickButtonUpdateData(
          this.state._id,
          this.state.detailData, newData);
    }
  }
  _setError(fieldName, fieldKey) {
    const st = {
      isFormOk: false,
      isSuccess: false,
      isError: true,
      formMessage: `"${fieldName}" tidak boleh kosong.`
    };
    st[fieldKey + '_error'] = true;
    this.setState(st);
  }
  _saveDataResponse(status, message) {
    const msg = message;
    this.setState({
      isSuccess: status,
      isError: !status,
      formMessage: msg
    });
    this.props.onUpdateSiswaSuccess(this.state.newData);
  }
  _onChangeInputPhoto(photoPath) {
    this.props.onChangeInputPhoto(photoPath);
  }
  _renderButtonSubmit() {
    // alert(this.state._id);
    if (this.state._id && this.state._id !== '') {
      return (
        <div>
          <Button
            type='submit'
            onClick={() => this._onClickButtonUpdateData()}
            positive
          >
            Update
          </Button>
          <Button
            type='submit'
            onClick={() => this._onClickButtonDeleteData()}
            negative
          >
            Hapus
          </Button>
          <Confirm
            open={this.state.openConfirmDelete}
            onCancel={this._onCancelConfirmDelete}
            onConfirm={this._onOkConfirmDelete}
          />
        </div>
      );
    }
    return (
      <Button
        type='submit'
        onClick={() => this._onClickButtonSaveData()}
        positive
      >
        Submit
      </Button>
    );
  }
  render() {
    console.log('FormInputSiswa Render');
    return (
        <Form
          success={this.state.isSuccess}
          error={this.state.isError}
        >
          <Message
            success={this.state.isSuccess}
            error={this.state.isError}
            header='Form Input Siswa'
            content={this.state.formMessage}
          />
          <Form.Field>
            <Form.Input
              label='Nama'
              placeholder='nama'
              value={this.state.name}
              name='name'
              onChange={e => this._onChangeInputText('name', e.target.value)}
              error={this.state.name_error}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Nama Akhir'
              placeholder='nama akhir'
              value={this.state.last_name}
              name='last_name'
              onChange={e => this._onChangeInputText('last_name', e.target.value)}
              error={this.state.last_name_error}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder='pilih kelas'
              fluid
              selection
              options={kelasOptions}
              value={this.state.kelas}
              onChange={(e, data) => {
                // console.log(e);
                // console.log(data);
                this._onChangeInputText('kelas', data.value);
                }}
              error={this.state.jabatan_error}
            />
            {/* <Form.Input
              label='Kelas'
              placeholder='Kelas'
              value={this.state.kelas}
              name='kelas'
              onChange={e => this._onChangeInputText('kelas', e.target.value)}
              error={this.state.kelas_error}
            /> */}
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='NIS'
              placeholder='NIS'
              value={this.state.nis}
              name='nis'
              onChange={e => this._onChangeInputText('nis', e.target.value)}
              error={this.state.nis_error}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='ID'
              placeholder='input menggunakan barcode scanner atau input manual'
              value={this.state.id}
              name='id'
              onChange={e => this._onChangeInputText('id', e.target.value)}
              error={this.state.id_error}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Photo'
              type="file"
              name="photo"
              id="photo"
              // value={this.state.photo}
              onChange={
                e => {
                  // console.log('e.target.files[0]==>', e.target.files[0]);
                  // const file = e.target.files[0];
                  // const reader = new FileReader();
                  // reader.readAsDataURL(file);
                  const input = e.target;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const dataURL = reader.result;
                    const output = document.getElementById('imgDisplay');
                    const img = output.getElementsByTagName('img')[0];
                    img.src = dataURL;
                    // const src = output.getElementsByTagName('img').getAttribute('src');
                    // output.src = dataURL;
                    // console.log('====>>>', img);
                  };
                  reader.readAsDataURL(input.files[0]);
                  this._onChangeInputText('photo', e.target.files[0]);
                }
              }
            />
          </Form.Field>
          {/* <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field> */}
          {this._renderButtonSubmit()}
        </Form>
    );
  }
}
