import React, { Component } from 'react';
import { Container, Form, Button, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SplashAction from '../actions/SplashAction';

class Splash extends Component {
  constructor(props) {
    super(props);
    console.log('');
  }
  componentWillMount() {
    this.props.modifyLoadingDataUsersInProgress(true);
    this.props.loadingDataUsers();
  }
  componentWillReceiveProps(nextProps) {
    console.log('[Splash.componentWillReceiveProps] ==>', nextProps);
    // this._setDataSource(nextProps.contacts);
  }
  render() {
    if (this.props.dataUsersReducer.loadingDataUsersInProgress) {
      return (
        <div>
          <span>Loading data..... plase wait</span>
        </div>
      );
    }
    return <Redirect to='/login' />;
  }
}

function mapStateToProps(state) {
  return {
    dataUsersReducer: state.dataUsersReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SplashAction, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
