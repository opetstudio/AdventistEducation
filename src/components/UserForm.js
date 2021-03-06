import React, { Component } from 'react';
import { Button, Form, Message, Confirm, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

import { userRoleOptions } from '../common';

const FIELDS = {
  name: '',
  user_role: '',
  username: '',
  password: '',
  id: '',
  _id: '',
  photo: '',
  new_photo_path: ''
};
const FIELDS_ERROR_FLAG = {
  name_error: false,
  user_role_error: false,
  username_error: false,
  password_error: false,
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
  openConfirmDelete: false,
  usersessionDetail: {}
};

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this._onChangeInputText = this._onChangeInputText.bind(this);
    this._onClickButtonSaveData = this._onClickButtonSaveData.bind(this);
    this._onClickButtonUpdateData = this._onClickButtonUpdateData.bind(this);

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
    this._checkPasswordMandatory = this._checkPasswordMandatory.bind(this);

    this._renderFormFieldUserRole = this._renderFormFieldUserRole.bind(this);
    this._renderForm = this._renderForm.bind(this);
  }
  componentWillMount() {
    this._resetState();
    this._setDataDetail(this.props.detailData);
    this.setState({
      formMessage: this.props.formMessage,
      isSuccess: this.props.isFormModalSuccess,
      isError: this.props.isFormError,
      usersessionDetail: this.props.usersessionDetail
    });
  }
  componentWillReceiveProps(nextProps) {
    this._resetState();
    this._setDataDetail(nextProps.detailData);
    this.setState({
      formMessage: nextProps.formMessage,
      isSuccess: nextProps.isFormModalSuccess,
      isError: nextProps.isFormError,
      usersessionDetail: nextProps.usersessionDetail
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
        user_role: dataDetail.user_role,
        user_role_error: false,
        username: dataDetail.username,
        username_error: false,
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
      case 'user_role':
        console.log(`user role onchange key=${key} value=${value}`);
        this.setState({ user_role: value, user_role_error: false }); break;
      case 'username': this.setState({ username: value, username_error: false }); break;
      case 'password': this.setState({ password: value, password_error: false }); break;
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
    } else if(fieldValue) {
      //untuk number
      newData[fieldKey] = fieldValue;
      return true;
    }
    console.log(`${fieldName} not ok. key=${fieldKey} value=${fieldValue}`);
        this._setError(fieldName, fieldKey);
        return false;
  }
  _thisCheckMandatory(newData) {
    let isFormOk = true;
    isFormOk = this._checkField(isFormOk, newData, 'name', this.state.name, 'NAMA');
    isFormOk = this._checkField(isFormOk, newData, 'user_role', this.state.user_role, 'USER_ROLE');
    isFormOk = this._checkField(isFormOk, newData, 'username', this.state.username, 'USERNAME');
    // isFormOk = this._checkField(isFormOk, newData, 'password', this.state.password, 'PASSWORD');
    isFormOk = this._checkField(isFormOk, newData, 'id', this.state.id, 'ID');
    return isFormOk;
  }
  _checkPasswordMandatory(newData) {
    let isFormOk = true;
    isFormOk = this._checkField(isFormOk, newData, 'password', this.state.password, 'PASSWORD');
    return isFormOk;
  }
  _onClickButtonSaveData() {
    const newData = {};
    let isFormOk = true;
    if(this.state.username === 'root'){
      isFormOk = false;
      this._setError('USERNAME', 'username');
    }
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

      //cek password harus diisi
      if(isFormOk) isFormOk = this._checkPasswordMandatory(newData);

    if (isFormOk) {
        this.setState({
          newData
        });
        this.props.onClickButtonSaveData(newData);
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
    if (this.state.password && this.state.password !== '') {
      if(isFormOk) isFormOk = this._checkPasswordMandatory(newData);
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
  // _saveDataResponse(status, message) {
  //   const msg = message;
  //   this.setState({
  //     isSuccess: status,
  //     isError: !status,
  //     formMessage: msg
  //   });
  //   this.props.onUpdateSiswaSuccess(this.state.newData);
  // }
  _onChangeInputPhoto(photoPath) {
    this.props.onChangeInputPhoto(photoPath);
  }
  _renderButtonSubmit() {
    // alert(this.state._id);
    if (this.state._id && this.state._id !== '' && this.props.isUpdateProfile) {
      return (
        <Button
          type='submit'
          onClick={() => this._onClickButtonUpdateData()}
          positive
        >
          Update
        </Button>
      );
    }
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
  _renderFormFieldUserRole(userRoleOptionsFiltered) {
    const opt = userRoleOptions;
    const userRole = _.find(opt, { value: this.state.user_role} );
    //100 = root
    if(userRole && this.props.isUpdateProfile && this.state.user_role !== 100){
      return (
        <input type="text" name="user_role" value={userRole.text} readOnly />
      );
    }
    return (
      <Dropdown
        placeholder='pilih user role'
        fluid
        selection
        options={userRoleOptionsFiltered}
        value={this.state.user_role}
        onChange={(e, data) => {
          // console.log(e);
          console.log(data);
          this._onChangeInputText('user_role', data.value);
          }}
        error={this.state.user_role_error}
      />
    );

  }

  _renderForm(){
    let passwordLabel = 'Password';
    if (this.state._id && this.state._id !== '') {
      passwordLabel = 'Password (kosongkan jika tidak ingin ganti password)';
    }
    // userRoleOptions
    let userRoleOptionsFiltered = userRoleOptions;
    if(this.state.user_role !== 100){
      userRoleOptionsFiltered = _.compact(
        _.map(userRoleOptions, (v) => { if(v.value > this.state.usersessionDetail.user_role) return v;  return null; })
      );
    }

    if(false){
      return (
        <Form.Field>
          <Form.Input
            label={passwordLabel}
            placeholder='password'
            name='password'
            value={this.state.password}
            onChange={e => this._onChangeInputText('password', e.target.value)}
            error={this.state.password_error}
          />
        </Form.Field>
      );
    }
    return (
      <div>
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
          <label>User Role</label>
          {this._renderFormFieldUserRole(userRoleOptionsFiltered)}
          {/* <Form.Input
            label='jabatan'
            placeholder='jabatan'
            value={this.state.jabatan}
            name='jabatan'
            onChange={e => this._onChangeInputText('jabatan', e.target.value)}
            error={this.state.jabatan_error}
          /> */}
        </Form.Field>
        <Form.Field>
          <Form.Input
            label='Username'
            placeholder='username'
            value={this.state.username}
            name='username'
            onChange={e => this._onChangeInputText('username', e.target.value)}
            error={this.state.username_error}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            label={passwordLabel}
            placeholder='password'
            name='password'
            value={this.state.password}
            onChange={e => this._onChangeInputText('password', e.target.value)}
            error={this.state.password_error}
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
      </div>
    );
  }

  render() {
    return (
        <Form
          success={this.state.isSuccess}
          error={this.state.isError}
        >
          <Message
            success={this.state.isSuccess}
            error={this.state.isError}
            header='Form Input Data'
            content={this.state.formMessage}
          />
          {this._renderForm()}
          {/* <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field> */}
          {this._renderButtonSubmit()}
        </Form>
    );
  }
}
