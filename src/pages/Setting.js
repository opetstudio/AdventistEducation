import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
// import { Link, Redirect } from 'react-router-dom';
// import moment from 'moment';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import ContentTop from '../containers/ContentTop';
// import * as AdminAction from '../actions/AdminAction';

// import { remote } from 'electron';
import Header from '../containers/Header';
import Sidebar from '../containers/Sidebar';
// import RedirectIfNotLogin from '../containers/RedirectIfNotLogin';
import KickOutIfNotLogin from '../containers/KickOutIfNotLogin';
import SettingFormContainer from '../containers/SettingFormContainer';
import './Setting.css';
// import '../stylesheets/pages/login/Login.css';


export default class Setting extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.setState({
  //   //   menuVerticalLeftVisiblity: 'hidden'
  //   // });
  //   // console.log('');
  // }
  componentWillMount() {
    this.setState({
      menuVerticalLeftVisibility: 'hidden',
      menuVerticalRightVisibility: 'hidden'
    });
    // this.props.setCurrentPagePath('/admin');
    // this.props.modificationTitleAdmin('HALAMAN ADMIN');
    // console.log('admin page componentWillMount props====>>>>>', this.props);
    // this.props.modificationTitleAdmin('ABSENSI DIGITAL');
    // console.log('list contacts via props==>', this.props.contacts);
  }
  // componentWillReceiveProps(nextProps) {
  //   // this.state = {
  //   //     ...this.state
  //   // };
  // }

  render() {
    // console.log('props di halaman admin==>', this.props);
    // if (!(this.props.appReducer.current_sub_admin_path
    //     === 'admin' && this.props.appReducer.current_sub_admin_path !== '')) {
    //   return <Redirect to={`/${this.props.appReducer.current_sub_admin_path}`} />;
    // }
    // console.log('render');
    return (
      <div>
        <KickOutIfNotLogin />
        <Header currentPagePath='/setting' adminTitle='PENGATURAN' />
        <Sidebar />
        <div className={'containerWrapper'}>
          {/* <ContentTop withProfilePicture withContentTopMenu /> */}
          <div className='ContentWrapper'>
            <div className='SettingFormSpace'>
              <SettingFormContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   // const users = _.map(state.dataUsersReducer.dataUsers, (val, uid) => {
//   //   console.log('');
//   //   return { ...val, uid };
//   // });
//   return {
//     dataUsersReducer: state.dataUsersReducer,
//     sessionReducer: state.sessionReducer,
//     appReducer: state.appReducer
//   };
// }
//
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(AdminAction, dispatch);
//
//   // return {
//   //   fetchData: () => dispatch(fetchData())
//   // };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Admin);
