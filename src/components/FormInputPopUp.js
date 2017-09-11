import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const photoProfile = require('../img/photoProfile.png');

class FormInputPopUp extends Component {
  render() {
    return (
      <Modal trigger={<Button>{this.props.buttonTitle}</Button>}>
        <Modal.Header>Masukan data-data siswa dengan baik dan benar.</Modal.Header>
        <Modal.Content image>
          <Image wrapped src={photoProfile} />
          <Modal.Description style={{ width: '100%' }}>
            <Header>Default Profile Image</Header>
            {this.props.children}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

FormInputPopUp.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  children: PropTypes.node
};

// export default UsersListRender;
export default FormInputPopUp;
