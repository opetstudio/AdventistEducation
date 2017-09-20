'use strict';
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { saveData } from '../actions/DataAbsenAction';
import { onChangeInputScannerId, createData, clearDataDetailAbsen, setInputTextFromEmpty } from '../actions/AbsenAction';
import { fetchAll as fetchAllGurustaff } from '../actions/GurustaffAction';
import { fetchAllDataSiswa } from '../actions/DataSiswaAction';

class AbsenListenerContainer extends Component {
  constructor(props) {
    super(props);
    // this.setState({
    //   inputAbsen: ''
    // });
    this.handleChange = this.handleChange.bind(this);
    this._setDataSourceGurustaff = this._setDataSourceGurustaff.bind(this);
    this._setDataSourceSiswa = this._setDataSourceSiswa.bind(this);
    this._catchDataSourceAbsenDataDetail = this._catchDataSourceAbsenDataDetail.bind(this);
    this._createDataAbsen = this._createDataAbsen.bind(this);
    this._clearAbsenDetail = this._clearAbsenDetail.bind(this);
  }
  componentWillMount() {
    console.log('componentWillMount');
    this.props.fetchAllGurustaff(this.props.SettingReducer.neDBDataPath);
    this.props.fetchAllDataSiswa(this.props.SettingReducer.neDBDataPath);
    this._setDataSourceGurustaff(this.props.listDataGurustaff);
    this._setDataSourceSiswa(this.props.listDataSiswa);
    this.setState({
      inputAbsen: this.props.AbsenReducer.inputScannerId,
      dataDetail: this.props.AbsenReducer.dataDetail,
      detailPhotoBuffer: this.props.AbsenReducer.detailPhotoBuffer,
      isInputTextFromEmpty: this.props.AbsenReducer.isInputTextFromEmpty
    });
    this._catchDataSourceAbsenDataDetail(
      this.props.AbsenReducer.dataDetail,
      this.props.AbsenReducer.detailPhotoBuffer
    );
  }
  componentWillReceiveProps(nextProps) {
    // console.log('AbsenListenerContainer componentWillReceiveProps ', nextProps);
    // if (nextProps.listDataGurustaff.length === 0) {
    //   nextProps.fetchAllGurustaff(nextProps.SettingReducer.neDBDataPath);
    // }
    // if (nextProps.listDataSiswa.length === 0) {
    //   nextProps.fetchAllDataSiswa(nextProps.SettingReducer.neDBDataPath);
    // }

    this._setDataSourceGurustaff(nextProps.listDataGurustaff);
    this._setDataSourceSiswa(nextProps.listDataSiswa);
    this.setState({
      inputAbsen: nextProps.AbsenReducer.inputScannerId,
      dataDetail: nextProps.AbsenReducer.dataDetail,
      detailPhotoBuffer: nextProps.AbsenReducer.detailPhotoBuffer,
      isInputTextFromEmpty: nextProps.AbsenReducer.isInputTextFromEmpty
    });
    this._catchDataSourceAbsenDataDetail(
      nextProps.AbsenReducer.dataDetail,
      nextProps.AbsenReducer.detailPhotoBuffer
    );
  }
  componentWillUnmount(){
    this.props.clearDataDetailAbsen();
    this._clearAbsenDetail();
  }
  _clearAbsenDetail(){
    console.log('_clearAbsenDetail');
    this._catchDataSourceAbsenDataDetail({},'');
  }
  _setDataSourceGurustaff(listDataGurustaff) {
    this.setState({ listDataGurustaff });
  }
  _setDataSourceSiswa(listDataSiswa) {
    this.setState({ listDataSiswa });
  }
  _catchDataSourceAbsenDataDetail(dataDetail, detailPhotoBuffer) {
      this.props.onCatchDataUser(dataDetail, detailPhotoBuffer);
  }
  _createDataAbsen(dataDetail, entity) {
    const newData = _.omit(dataDetail, ['_id']);
    this.props.createData({
      ...newData,
      datetime: new Date().getTime()
    }, this.props.SettingReducer.neDBDataPath, entity);
  }
  handleChange(value) {
    let self = this;
    // if (this.state.isInputTextFromEmpty) {
    //   this.props.setInputTextFromEmpty(false);
    //     // this.setState({ inputAbsen: '' });
    //     // this.props.setInputTextFromEmpty
    //     this._clearAbsenDetail();
    //   } else {
    //     // this.setState({
    //     //   isInputTextFromEmpty: true
    //     // });
        setTimeout(() => {
          // self.setState({ isInputTextFromEmpty: false });
          // this.props.setInputTextFromEmpty(true);
          this._clearAbsenDetail();
        }, 2000);
    //   }

    console.log(value);
    let l = 0;
    if (value !== null || value !== '') {
      l = value.length;
    }
    const id = value;
    const gurustaffRow = _.find(this.state.listDataGurustaff, { id });
    if (gurustaffRow) {
      console.log('dapat row gurustaff', gurustaffRow);
      this.props.onChangeInputScannerId(
        value,
        gurustaffRow
      );
      this._createDataAbsen(gurustaffRow, 'absenGurustaff');
    } else {
      console.log('tidak dapat row gurustaffRow', gurustaffRow);
      const siswaRow = _.find(this.state.listDataSiswa, { id });
      if (siswaRow) {
        console.log('dapat row listDataSiswaRow, siswaRow');
        this.props.onChangeInputScannerId(
          value,
          siswaRow
        );
        this._createDataAbsen(siswaRow, 'absenSiswa');
      } else {
        console.log('tidak dapat row siswaRow', siswaRow);
        this.props.onChangeInputScannerId(
          value,
          null
        );
      }
    }

    // console.log('handleChange ', l);
    // this.setState({
    //   inputAbsen: value
    // });
    // if (l === 6) {
    //   //submitUsernamePasswordSession
    //   if (
    //     this.props.SettingReducer.neDBDataPath === null
    //     || this.props.SettingReducer.neDBDataPath === '') {
    //       alert('Directory data belum di set. Silahkan ke halaman pengaturan, ' +
    //       'dan isi directory database di kolom neDBDataPath. Terima kasih.');
    //     } else {
    //       const dataAbsen = {
    //         id: this.state.inputAbsen,
    //         checkin: new Date().getTime()
    //       };
    //       this.props.saveData(JSON.stringify(dataAbsen),
    //         this.props.SettingReducer.neDBDataPath);
    //     }
    //     this.setState({ inputAbsen: '' });
    // }
  }
  render() {
    return (
      <div>
        <Input
          loading={false}
          icon='user'
          iconPosition='left'
          placeholder='id siswa...'
          value={this.state.inputAbsen}
          name='inputAbsenId'
          ref='inputAbsenId'
          onChange={e => this.handleChange(e.target.value)}
        />
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
    listDataGurustaff: state.GurustaffReducer.listData,
    listDataSiswa: state.DataSiswaReducer.ListDataSiswa,
    AbsenReducer: state.AbsenReducer,
    GurustaffReducer: state.GurustaffReducer,
    DataSiswaReducer: state.DataSiswaReducer,
    // dataUsersReducer: state.dataUsersReducer,
    // sessionReducer: state.sessionReducer,
    // appReducer: state.appReducer,
    SettingReducer: state.SettingReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveData,
    clearDataDetailAbsen,
    setInputTextFromEmpty,
    onChangeInputScannerId,
    fetchAllGurustaff,
    fetchAllDataSiswa,
    createData
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenListenerContainer);
