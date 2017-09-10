import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Header as Head, Container, Confirm, Button, Modal } from 'semantic-ui-react';
import { logOut } from '../actions/LoginAction';
import { setCurrentPagePath } from '../actions/AdminAction';

import './Header.css';

let remote = null;
let ipcRenderer = null;
if (window.require) {
    remote = window.require('electron').remote;
    ipcRenderer = window.require('electron').ipcRenderer;
    ipcRenderer.on('message', (event, message) => {
        console.log(message); // logs out "Hello second window!"
    });
    // console.log('remmmmoooooootottt===>', remote.getCurrentWindow());

    //main = remote.require('../electron-starter.js');
}


const close_icon = require('../img/close.png');
const minimize_icon = require('../img/minimize.png');
const logo = require('../img/logo.png');

class Header extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   openCloseWindowConfirm: false,
    //   closeOnEscape: true,
    //   closeOnRootNodeClick: true
    // };
    // console.log('this.state: ', this.state);
    // this.setState({
    //   openCloseWindowConfirm: false,
    //   closeOnEscape: true,
    //   closeOnRootNodeClick: true
    // });
    console.log('Header CONSTRUCTORRRRRRRR===>', this.state);
  }
  componentWillMount() {
    this.setState({
      openCloseWindowConfirm: false,
      closeOnEscape: true,
      closeOnRootNodeClick: true,
      currentPagePath: this.props.currentPagePath,
      redirect: false
    });
    // this.setState({ redirect: true, pagePath });
    this.props.setCurrentPagePath(this.props.currentPagePath);
  }
  componentDidMount() {
    // console.log('this.state: ', this.state);
    this.setState({
      openCloseWindowConfirm: false,
      closeOnEscape: true,
      closeOnRootNodeClick: true,
      currentPagePath: this.props.currentPagePath
    });
    this.props.setCurrentPagePath(this.props.currentPagePath);
  }
  gotoPage(pagePath) {
    this.setState({ redirect: true, pagePath });
  }
  showModal() {
    if (remote !== null) {
      // main.pong(6);
      // ipcRenderer.send('/user-detail', 1, 2, 3);
      this.setState({
        openCloseWindowConfirm: true
      });
    }
  }
  closeModal(isCloseWindow) {
    if (remote !== null) {
      this.setState({
        openCloseWindowConfirm: false
      });
      if (isCloseWindow) { remote.getCurrentWindow().close(); }
    }
  }
  handleCancel() {

  }
  handleConfirm() {

  }

  render() {
    const { openCloseWindowConfirm } = this.state;
    return (
      <div className={'contentWrapper'}>
        <Modal open={openCloseWindowConfirm}>
          <Modal.Header>Konfirmasi</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Apakah anda akan keluar dari aplikasi ?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => this.closeModal(false)} >
              No
            </Button>
            <Button
              positive icon='checkmark'
              labelPosition='right'
              content="Yes" onClick={() => this.closeModal(true)}
            />
          </Modal.Actions>
        </Modal>

        <div className={classnames('headerMenuWrapper')}>
          <div className={'headerMenu'}>
            <div className={'kiriAtasWrapper'}>
              <div className={'kiriAtas'}>
                <img src={logo} alt='' />
              </div>
              <div className={'adminTitle'} >
                <span>{this.props.adminTitle}</span>
              </div>
            </div>
            <div className={'appsControlWrapper'}>
              <div className={'appsControl'}>
                <img
                  className={'img_icon'}
                  style={{ cursor: 'pointer' }}
                  src={close_icon}
                  alt=''
                  onClick={() => this.showModal()}
                />
                <img
                  className={'img_icon'}
                  style={{ cursor: 'pointer' }}
                  src={minimize_icon}
                  alt=''
                  onClick={() => {
                    if (remote !== null) {
                      remote.getCurrentWindow().minimize();
                    }
                  }}
                />
              </div>
            </div>
          </div>
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
    dataUsersReducer: state.dataUsersReducer,
    sessionReducer: state.sessionReducer,
    appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logOut, setCurrentPagePath
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
