import React, { Component } from 'react';
import { Container, Form, Button, Loader, Message } from 'semantic-ui-react';

import './ContentTopMenu.css';

export default class ContentTopMenu extends Component {
  componentWillMount() {
    this.setState({
      menuVerticalLeftVisibility: 'hidden',
      menuVerticalRightVisibility: 'hidden'
    });
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
  _onMouseEnterLeftMenu() {
    this.setState({ menuVerticalLeftVisibility: 'visible' });
  }
  _onMouseLeaveLeftMenu() {
    this.setState({ menuVerticalLeftVisibility: 'hidden' });
  }
  _onMouseEnterRightMenu() {
    this.setState({ menuVerticalRightVisibility: 'visible' });
  }
  _onMouseLeaveRightMenu() {
    this.setState({ menuVerticalRightVisibility: 'hidden' });
  }
  render() {
    return (
      <div className={'profileInfoRightMenuWrapper'}>
        <div className={'profileInfoRightMenuleft'} />
        <div className={'profileInfoRightMenuRight'}>
          <Button.Group widths='2' style={{ height: 40 }}>
            <Button
              onMouseEnter={this._onMouseEnterLeftMenu.bind(this)}
              onMouseLeave={this._onMouseLeaveLeftMenu.bind(this)}
              color='linkedin'
              style={{ borderRadius: 0, background: '#0597bf' }}
            >
              Control Absen
            </Button>
            <Button
              onMouseEnter={this._onMouseEnterRightMenu.bind(this)}
              onMouseLeave={this._onMouseLeaveRightMenu.bind(this)}
              color='linkedin'
              style={{ borderRadius: 0, background: '#0597bf' }}
            >
              Rekap
            </Button>
          </Button.Group>
          <div className={'menuVerticalWrapper'}>
            <div
              className={'menuVerticalLeft'}
              style={{ visibility: this.state.menuVerticalLeftVisibility }}
              onMouseEnter={this._onMouseEnterLeftMenu.bind(this)}
              onMouseLeave={this._onMouseLeaveLeftMenu.bind(this)}
            >
              <Button.Group vertical style={{ width: '100%' }}>
                <Button onClick={()=>this.props.onClickSubmenu('set-absen-mode-to-checkout')} style={{ borderRadius: 0, background: '#a1a1a1' }}>Check In</Button>
                <Button onClick={()=>this.props.onClickSubmenu('set-absen-mode-to-checkin')} style={{ borderRadius: 0, background: '#c26bd7' }}>Check Out</Button>
              </Button.Group>
            </div>
            <div
              className={'menuVerticalRight'}
              style={{ visibility: this.state.menuVerticalRightVisibility }}
              onMouseEnter={this._onMouseEnterRightMenu.bind(this)}
              onMouseLeave={this._onMouseLeaveRightMenu.bind(this)}
            >
              <Button.Group vertical style={{ width: '100%' }}>
                <Button onClick={()=>this.props.onClickSubmenu('rekap-siswa')} style={{ borderRadius: 0, background: '#a1a1a1' }}>Siswa</Button>
                <Button onClick={()=>this.props.onClickSubmenu('rekap-gurustaff')} style={{ borderRadius: 0, background: '#c26bd7' }}>Guru</Button>
              </Button.Group>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
