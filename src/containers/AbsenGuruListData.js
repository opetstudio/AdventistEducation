import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AbsenTable from '../components/AbsenTable';
import ListData from '../components/ListData';
import { fetchAllDataAbsenGuru } from '../actions/DataAbsenAction';
import * as AdminAction from '../actions/AdminAction';
// import './ContentTop.css';

class AbsenGuruListData extends Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this._setDataSourceAbsenTeachers = this._setDataSourceAbsenTeachers.bind(this);
  }
  componentWillMount() {
    this.setState({
      filterText: '',
      absenTeachers: []
    });
    this.props.fetchAllDataAbsenGuru(
      this.props.SettingReducer.neDBDataPath
    );
    this._setDataSourceAbsenTeachers(this.props.absenTeachers);
  }
  componentWillReceiveProps(nextProps) {
    this._setDataSourceAbsenTeachers(nextProps.absenTeachers);
  }
  handleUserInput(filterText) {
    this.setState({ filterText });
  }
  _setDataSourceAbsenTeachers(absenTeachers) {
    this.setState({ absenTeachers });
  }
  render() {
    return (
      <ListData
        title="Guru"
        headerTitleBackgroundColor='#c26bd7'
        filterTextInput='filterTextInputGuru'
        onUserInput={this.handleUserInput}
        filterTextValue={this.state.filterText}
        listData={this.state.absenTeachers}
      >
        <AbsenTable
          listData={this.state.absenTeachers}
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
    absenTeachers: state.DataAbsenReducer.ListAbsenTeachers,
    SettingReducer: state.SettingReducer
    // dataUsersReducer: state.dataUsersReducer,
    // sessionReducer: state.sessionReducer,
    // appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...AdminAction,
      fetchAllDataAbsenGuru
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenGuruListData);
