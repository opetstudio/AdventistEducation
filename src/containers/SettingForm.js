import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveDataSetting } from '../actions/SettingAction';
import './SettingForm.css';


class SettingForm extends Component {
  constructor(props) {
    super(props);
    this._onChangeInputNeDbDataPath = this._onChangeInputNeDbDataPath.bind(this);
    this._saveDataSettingResponse = this._saveDataSettingResponse.bind(this);
  }
  componentWillMount() {
    this.setState({
      neDBDataPath: this.props.SettingReducer.neDBDataPath,
      isSuccess: false,
      isError: false,
      formMessage: 'Masukan data dengan baik dan benar.',
    });
  }
  _onChangeInputNeDbDataPath(value) {
    this.setState({
      neDBDataPath: value
    });
  }
  _onClickButtonSaveDataSetting() {
    this.props.saveDataSetting({
      neDBDataPath: this.state.neDBDataPath
    }, this._saveDataSettingResponse);
  }
  _saveDataSettingResponse(status, message) {
    const msg = status ? 'Data berhasil disimpan.' : message;
    this.setState({
      isSuccess: status,
      isError: !status,
      formMessage: msg
    });
  }
  render() {
    return (
      <div className='formSettingWrapper'>
        <Form success={this.state.isSuccess} error={this.state.isError}>
          <Message
            success={this.state.isSuccess}
            error={this.state.isError}
            header='Form Pengaturan'
            content={this.state.formMessage}
          />
          <Form.Field>
            <label>NeDB Data Path (directory tempat penyimpanan data)</label>
            <Input
              loading={false}
              // icon='user'
              // iconPosition='left'
              placeholder='neDB data path...'
              value={this.state.neDBDataPath}
              name='neDBDataPath'
              ref='neDBDataPath'
              onChange={e => this._onChangeInputNeDbDataPath(e.target.value)}
            />
          </Form.Field>
          {/* <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field> */}
          <Button
            type='submit'
            onClick={() => this._onClickButtonSaveDataSetting()}
          >
            Submit
          </Button>
        </Form>
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
    SettingReducer: state.SettingReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveDataSetting
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingForm);
