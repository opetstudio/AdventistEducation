
import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
// import { remote } from 'electron';
import Header from '../includes/Header';
import ModalExampleDimmer from '../includes/ModalExampleDimmer';
import '../../stylesheets/pages/login/Login.css';


const big_title = require('../../../img/big_title.png');
const button_with_right_arrow = require('../../../img/button_with_right_arrow.png');

// const windowRemote = remote.getCurrentWindow();

export default class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className={'headerTitleWrapper'}>
            <img className={'img_bigtitle'} src={big_title} alt='' />
        </div>
        <Container>
          <div className={'loginBoxWrapper'}>
            <div className={'tanggalHariIniWrapper'}>
              <h1>RABU, 14 JUNI 2017</h1>
            </div>
            <div className={'loginBox'}>
              <div className={'loginBoxHeader'}>
                <h1>Log In</h1>
              </div>
              <div className={'loginBoxBody'}>
                <Form style={{ clear: 'both', display: 'table', width: '100%' }}>
                  <Form.Field>
                    <input type='text' name='idnumber' placeholder='ID Number' />
                  </Form.Field>
                  <Form.Field>
                    <input type='password' name='password' placeholder='Password' />
                  </Form.Field>
                  <Button
                    floated='right'
                    onClick={() => alert('cek id number dan password')}
                    primary
                  >
                    Log In
                  </Button>
                </Form>
              </div>
            </div>
            <div className={'bottomButtonWrapper'}>
              <h1
                onClick={() => {
                  alert('ke halaman absen');
                  // console.log(electron);
                  // const windowRemote = remote.getCurrentWindow();
                  // windowRemote.close();
                }}
              >
                KE HALAMAN ABSEN
                <img
                  className={'img_button_with_right_arrow'}
                  src={button_with_right_arrow} alt=''
                />
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
