import React, { Component } from 'react';
import moment from 'moment';

import './AbsenDateTime.css';

export default class AbsenDateTime extends Component {
  render() {
    return (
      <div className={'AbsenDateTimeWrapper'}>
        <span className={'tanggal'}>{moment(new Date().getTime()).format('MMMM Do YYYY')}</span>
        <div className={'jamMenitWrapper'}>
          <span className={'jam'}>
            {moment(new Date().getTime()).format('HH')}
          </span>
          <span className={'titikDua'}>:</span>
          <span className={'menit'}>
            {moment(new Date().getTime()).format('mm')}
          </span>
        </div>
        <div className={'keterangan'}>
          <span>Silahkan Tap kartu anda pada mesin absen</span>
        </div>
      </div>
    );
  }
}
