import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AdminAction from '../actions/AdminAction';

class RedirectIfNotLogin extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.setState({
  //   //   menuVerticalLeftVisiblity: 'hidden'
  //   // });
  //   // console.log('');
  // }
  componentWillMount() {
    // console.log('props====>>>>>', this.props);
    this.setState({
      menuVerticalLeftVisibility: 'hidden',
      menuVerticalRightVisibility: 'hidden'
    });
    // this.props.modificationTitleAdmin('ABSENSI DIGITAL');
    // console.log('list contacts via props==>', this.props.contacts);
  }

  render() {
    if (!this.props.sessionReducer.isLogin) {
      return <Redirect to='/login' />;
    }
    return (
      <div />
    );
  }
}

function mapStateToProps(state) {
  // const users = _.map(state.dataUsersReducer.dataUsers, (val, uid) => {
  //   console.log('');
  //   return { ...val, uid };
  // });
  return {
    dataUsersReducer: state.dataUsersReducer,
    sessionReducer: state.sessionReducer,
    appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(AdminAction, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectIfNotLogin);
