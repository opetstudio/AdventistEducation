import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AbsenTable from '../components/AbsenTable';
import ListData from '../components/ListData';
import { fetchAllDataAbsenSiswa } from '../actions/DataAbsenAction';
import * as AdminAction from '../actions/AdminAction';
// import './ContentTop.css';

class AbsenSiswaListData extends Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this._setDataSourceAbsenStudents = this._setDataSourceAbsenStudents.bind(this);
  }
  componentWillMount() {
    this.setState({
      filterText: '',
      absenStudents: []
    });
    this.props.fetchAllDataAbsenSiswa(
      this.props.SettingReducer.neDBDataPath
    );
    this._setDataSourceAbsenStudents(this.props.absenStudents);
    // this.setState({
    //   menuVerticalLeftVisibility: 'hidden',
    //   menuVerticalRightVisibility: 'hidden'
    // });
    // this.props.modificationTitleAdmin('HALAMAN ADMIN');
    // console.log('admin page componentWillMount props====>>>>>', this.props);
    // this.props.modificationTitleAdmin('ABSENSI DIGITAL');
    // console.log('list contacts via props==>', this.props.contacts);
  }
  componentWillReceiveProps(nextProps) {
    this._setDataSourceAbsenStudents(nextProps.absenStudents);
  }
  handleUserInput(filterText) {
    this.setState({ filterText });
  }
  _setDataSourceAbsenStudents(absenStudents) {
    this.setState({ absenStudents });
  }
  render() {
    return (
      <ListData
        title="Siswa"
        headerTitleBackgroundColor='#00bff3'
        filterTextInput='filterTextInputSiswa'
        onUserInput={this.handleUserInput}
        filterTextValue={this.state.filterText}
        listData={this.state.absenStudents}
      >
        <AbsenTable
          listData={this.state.absenStudents}
          filterTextValue={this.state.filterText}
        />
      </ListData>
    );
  }
}

function mapStateToProps(state) {
  // const users = _.map(state.dataUsersReducer.dataUsers, (val, uid) => {
  //   console.log('');
  //   return { ...val, uid };
  // });
  return {
    absenStudents: state.DataAbsenReducer.ListAbsen,
    SettingReducer: state.SettingReducer,
    // dataUsersReducer: state.dataUsersReducer,
    // sessionReducer: state.sessionReducer,
    // appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...AdminAction,
      fetchAllDataAbsenSiswa
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenSiswaListData);
