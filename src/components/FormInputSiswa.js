import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form, Checkbox, Message } from 'semantic-ui-react';

export default class FormInputSiswa extends Component {
  constructor(props) {
    super(props);
    this._onChangeInputText = this._onChangeInputText.bind(this);
    this._onClickButtonSaveData = this._onClickButtonSaveData.bind(this);
    this._saveDataResponse = this._saveDataResponse.bind(this);
  }
  componentWillMount() {
    this.setState({
      isSuccess: false,
      isError: false,
      formMessage: 'Masukan data dengan baik dan benar.',
      name: '',
      last_name: '',
      kelas: '',
      nis: '',
      id: ''
    });
    this._onChangeInputText = this._onChangeInputText.bind(this);
  }
  _onChangeInputText(key, value) {
    switch (key) {
      case 'name': this.setState({ name: value }); break;
      case 'last_name': this.setState({ last_name: value }); break;
      case 'kelas': this.setState({ kelas: value }); break;
      case 'nis': this.setState({ nis: value }); break;
      case 'id': this.setState({ id: value }); break;
      default:
        return true;
    }
  }
  _onClickButtonSaveData() {
    this.props.onClickButtonSaveData({
      name: this.state.name,
      last_name: this.state.last_name,
      kelas: this.state.kelas,
      nis: this.state.nis,
      id: this.state.id,
    }, this._saveDataResponse);
  }
  _saveDataResponse(status, message) {
    const msg = message;
    this.setState({
      isSuccess: status,
      isError: !status,
      formMessage: msg
    });
  }
  render() {
    return (
        <Form success={this.state.isSuccess} error={this.state.isError}>
          <Message
            success={this.state.isSuccess}
            error={this.state.isError}
            header='Form Input Siswa'
            content={this.state.formMessage}
          />
          <Form.Field>
            <label>Nama</label>
            <input
              placeholder='nama'
              value={this.state.name}
              name='name'
              ref='name'
              onChange={e => this._onChangeInputText('name', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Nama Akhir</label>
            <input
              placeholder='nama akhir'
              value={this.state.last_name}
              name='last_name'
              ref='last_name'
              onChange={e => this._onChangeInputText('last_name', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Kelas</label>
            <input
              placeholder='Kelas'
              value={this.state.kelas}
              name='kelas'
              ref='kelas'
              onChange={e => this._onChangeInputText('kelas', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>NIS</label>
            <input
              placeholder='NIS masukan 6 digit'
              value={this.state.nis}
              name='nis'
              ref='nis'
              onChange={e => this._onChangeInputText('nis', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>ID</label>
            <input
              placeholder='input menggunakan barcode scanner atau input manual'
              value={this.state.id}
              name='id'
              ref='id'
              onChange={e => this._onChangeInputText('id', e.target.value)}
            />
          </Form.Field>
          {/* <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field> */}
          <Button
            type='submit'
            onClick={() => this._onClickButtonSaveData()}
          >
            Submit
          </Button>
        </Form>
    );
  }
}
