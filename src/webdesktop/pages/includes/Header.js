import React, { Component } from 'react';
import classnames from 'classnames';
import { Header as Head, Container, Confirm, Button, Modal } from 'semantic-ui-react';

import '../../stylesheets/pages/includes/Header.css';

let remote = null;
if (window.require) {
    remote = window.require('electron').remote;
}


const close_icon = require('../../../img/close.png');
const minimize_icon = require('../../../img/minimize.png');
const logo = require('../../../img/logo.png');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCloseWindowConfirm: false,
      closeOnEscape: true,
      closeOnRootNodeClick: true
    };
    // console.log('this.state: ', this.state);
  }
  componentDidMount() {
    // console.log('this.state: ', this.state);
  }
  showModal() {
    if (remote !== null) {
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
    console.log('this.state: ', this.state);
    const { openCloseWindowConfirm, closeOnEscape, closeOnRootNodeClick } = this.state;
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
