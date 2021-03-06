import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import SiswaTable from '../components/SiswaTable';
import ListData from '../components/ListData';
import {
  fetchAllDataSiswa,
  openModalFormUpdateData
} from '../actions/DataSiswaAction';
// import './ContentTop.css';

class SiswaListData extends Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this._fetchAllDataSiswaResponse = this._fetchAllDataSiswaResponse.bind(this);
    this._onClickEditSiswa = this._onClickEditSiswa.bind(this);
  }
  componentWillMount() {
    // console.log('[ListDataSiswa.componentWillMount]');
    // console.log('[neDBDataPath]', this.props.SettingReducer.neDBDataPath);
    this.setState({
      filterText: '',
      students: []
    });
    //get data dari server
    this.props.fetchAllDataSiswa(
      this.props.SettingReducer.neDBDataPath,
      this._fetchAllDataSiswaResponse
    );
    this._setDataSourceStudents(this.props.students);
  }
  componentWillReceiveProps(nextProps) {
    this._setDataSourceStudents(nextProps.students);
  }

  handleUserInput(filterText) {
    this.setState({
      filterText
    });
  }
  _setDataSourceStudents(students) {
    this.setState({ students });
  }
  _fetchAllDataSiswaResponse(e, o) {
    console.log('[ListDataSiswa._fetchAllDataSiswaResponse]');
  }
  _onClickEditSiswa(row) {
    //fetch data detail
    this.props.openModalFormUpdateData(row);
    // this.props.onClickEditSiswa();
  }
  render() {
    console.log('ListDataSiswa Render');
    return (
      <ListData
        title="Siswa"
        headerTitleBackgroundColor='#00bff3'
        filterTextInput='filterTextInputSiswa'
        onUserInput={this.handleUserInput}
        filterTextValue={this.state.filterText}
        listData={this.state.students}
      >
        <SiswaTable
          listData={this.state.students}
          filterTextValue={this.state.filterText}
          onClickEditSiswa={this._onClickEditSiswa}
        />
      </ListData>
    );
  }
}

function mapStateToProps(state) {
  // const students = _.map(state.DataSiswaReducer.ListDataSiswa, (val, uid) => {
  //   console.log('');
  //   return { ...val, uid };
  // });
  return {
    students: state.DataSiswaReducer.ListDataSiswa,
    DataSiswaReducer: state.DataSiswaReducer,
    SettingReducer: state.SettingReducer
    // dataUsersReducer: state.dataUsersReducer,
    // sessionReducer: state.sessionReducer,
    // appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAllDataSiswa,
      openModalFormUpdateData
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiswaListData);
