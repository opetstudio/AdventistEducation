import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

// import { openImageApi, closeImageApi } from '../api';

// const photoProfile = require('../img/photoProfile.png');
// ../img/U2NyZWVuc2hvdCBhdCBTZXAgMDMgMjMtNTctMTQucG5n.png


class FormInputPopUp extends Component {
  constructor(props) {
    super(props);
    console.log('');
    // this._openImage = this._openImage.bind(this);
    // this._closeImage = this._closeImage.bind(this);
    this._onClickButtonTrigger = this._onClickButtonTrigger.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
  }
  componentWillMount() {
    this.setState({
      open: this.props.open,
      imgSrc: this.props.imgSrc,
      buttonTitle: this.props.buttonTitle
    });
    // console.log('componentWillMount setState ', this.state);
    // if (this.props.open) this._openImage(this.props.imgSrc);
  }
  // componentDidMount() {
  //   this.setState({
  //     openModal: this.props.openModal
  //   });
  //   console.log('componentDidMount setState ', this.state);
  //   this._openImage(this.props.imgSrc);
  // }
  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
      imgSrc: nextProps.imgSrc,
      buttonTitle: nextProps.buttonTitle
    });
    // console.log('componentWillReceiveProps state ', this.state);
    // console.log('componentWillReceiveProps nextProps ', nextProps);
    // console.log('componentWillReceiveProps this.props ', this.props);
    // this._openImage(nextProps.imgSrc);
    // if (nextProps.open) this._openImage(nextProps.imgSrc);
    // this._closeImage(nextProps.imgSrc);
  }
  componentWillUnmount() {
    // console.log('componentWillUnmount state ', this.state);
    // console.log('componentWillUnmount props ', this.props);
  }
  // _openImage(imgSrc) {
  //   // if (!this.state.openModal) {
  //   //   return false;
  //   // }
  //   const that = this;
  //   openImageApi(imgSrc).then((response) => {
  //     // console.log(response);
  //     // const base64dataStr = response.message.toString('base64');
  //     // console.log('base64dataStr', base64dataStr);
  //     // console.log('response.message', response.message);
  //     if (response.status) {
  //     //     console.log('response.message', response.message);
  //         that.setState({
  //           imageOpen: true,
  //           imageBuffer: `data:image/png;base64, ${response.message}` });
  //     } else {
  //       that.setState({
  //         imageOpen: false,
  //         imageBuffer: ''
  //       });
  //     }
  //   }).catch((err) => {
  //     console.log(err);
  //     that.setState({ imageOpen: false });
  //   });
  // }
  // _closeImage(imgSrc) {
  //   const that = this;
  //   closeImageApi(imgSrc).then((response) => {
  //     that.setState({ imageOpen: false });
  //   }).catch((err) => {
  //     console.log(err);
  //     that.setState({ imageOpen: false });
  //   });
  // }
  // _getPhotoPath(photoPath) {
  //   const photoPathSplit = photoPath.split('/');
  //   const photoName = photoPathSplit[photoPathSplit.length - 1];
  //   return `../img/${photoName}`;
  // }

  _onClickButtonTrigger() {
    // this.props.onClickButtonTrigger();
  }
  _onCloseModal() {
    this.props.onCloseModal();
    // this.setState({ open: false });
  }
  render() {
    // console.log('FormInputPopUp Render props', this.props);
    // console.log('FormInputPopUp Render state', this.state);
    // const photoProfile = '../img/photoProfile.png';
    // const photoProfile = this.props.imgSrc;
    // if (this.props.imgSrc) {
    //   const photoProfile = '../img/photoProfile.png';
    // }
    // let photo = this.state.imageBuffer;
    // let photo = photoProfile;
    // if (this.props.imgSrc && this.props.imgSrc !== '') {
    //   photo = this._getPhotoPath(this.props.imgSrc);
    // }
    // const reader = new FileReader();
    // if (this.state.imageOpen) {
      // let buffImage = this.state.imgSrc;
      // if (this.state.imageBuffer !== '') buffImage = this.state.imageBuffer;
    //   photo = this.state.imageBuffer;
    // }
    // reader.readAsDataURL(photo);
    return (
      <div>
        <Button
          onClick={() => {
            this.props.onClickButtonTrigger();
          }}
        >
          {this.state.buttonTitle}
        </Button>
        <Modal
          open={this.state.open}
          onClose={this._onCloseModal}
        >
          <Modal.Header>Masukan data-data siswa dengan baik dan benar.</Modal.Header>
          <Modal.Content image>
            <Image
              id="imgDisplay"
              wrapped
              src={this.state.imgSrc}
              style={{ maxWidth: '50%' }}
            />
            <Modal.Description style={{ width: '100%' }}>
              <Header>Default Profile Image</Header>
              {this.props.children}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

FormInputPopUp.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  children: PropTypes.node
};

// export default UsersListRender;
export default FormInputPopUp;
