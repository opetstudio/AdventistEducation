import React, { Component } from 'react';
import { Form, Button, Loader, Message } from 'semantic-ui-react';
// import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Redirect } from 'react-router-dom';

// import { remote } from 'electron';
import {
  modificationUsernameSession,
  modificationPasswordSession,
  submitUsernamePasswordSession
 } from '../actions/LoginAction';
import { gotoSubAdminPage, setCurrentPagePath } from '../actions/AdminAction';
import { fetchAll } from '../actions/UserAction';

class LoginBox extends Component {
  constructor(props) {
    super(props);
    console.log('');
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
  }
  componentWillMount() {
    this.props.fetchAll(this.props.SettingReducer.neDBDataPath, this.props.UserReducer.listData);
  }
  componentWillReceiveProps(nextProps) {

  }
  renderErrorMessage() {
    if (this.props.sessionReducer.loginErrorMessage !== '') {
      return (
        <Message negative>
          <p>{this.props.sessionReducer.loginErrorMessage}</p>
        </Message>
      );
    }
  }
  render() {
    return (
      <div className={'loginBox'}>
        <div className={'loginBoxHeader'}>
          <h1>Log In</h1>
        </div>
        <div className={'loginBoxBody'}>
          {this.renderErrorMessage()}
          <Form style={{ clear: 'both', display: 'table', width: '100%' }}>
            <Form.Field>
              <input
                type='text'
                name='idnumber'
                placeholder='ID Number'
                value={this.props.sessionReducer.username}
                onChange={e => this.props.modificationUsernameSession(e.target.value)}
              />
              {/* onChangeText={text => this.props.modificationEmail(text)} */}
            </Form.Field>
            <Form.Field>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={this.props.sessionReducer.password}
                onChange={e => this.props.modificationPasswordSession(e.target.value)}
              />
            </Form.Field>
            <Button
              floated='right'
              onClick={() => this.props.submitUsernamePasswordSession(
                this.props.sessionReducer.username,
                this.props.sessionReducer.password,
                this.props.UserReducer.listData
              )}
              primary
            >
              Log In
            </Button>
            <Loader
              style={{ float: 'right' }}
              active={this.props.sessionReducer.submitLoginUserPassInProgress}
              inline
            />
          </Form>
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
    appReducer: state.appReducer,
    dataUsersReducer: state.dataUsersReducer,
    sessionReducer: state.sessionReducer,
    UserReducer: state.UserReducer,
    SettingReducer: state.SettingReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    modificationUsernameSession,
    modificationPasswordSession,
    submitUsernamePasswordSession,
    gotoSubAdminPage,
    setCurrentPagePath,
    fetchAll
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox);
