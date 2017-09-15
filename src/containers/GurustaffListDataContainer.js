import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import GurustaffTable from '../components/GurustaffTable';
import ListData from '../components/ListData';
import {
  fetchAll,
  openModalFormUpdateData
} from '../actions/GurustaffAction';
// import './ContentTop.css';

class GurustaffListDataContainer extends Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this._onClickEdit = this._onClickEdit.bind(this);
    this._setDataSource = this._setDataSource.bind(this);
  }
  componentWillMount() {
    // console.log('[listData.componentWillMount]');
    // console.log('[neDBDataPath]', this.props.SettingReducer.neDBDataPath);
    this.setState({
      filterText: '',
      listData: []
    });
    //get data dari server
    this.props.fetchAll(this.props.SettingReducer.neDBDataPath);
    this._setDataSource(this.props.listData);
  }
  componentWillReceiveProps(nextProps) {
    this._setDataSource(nextProps.listData);
  }

  handleUserInput(filterText) {
    this.setState({
      filterText
    });
  }
  _setDataSource(listData) {
    this.setState({ listData });
  }

  _onClickEdit(row) {
    this.props.openModalFormUpdateData(row);
  }
  render() {
    return (
      <ListData
        title="Guru dan Staff"
        headerTitleBackgroundColor='#00bff3'
        filterTextInput='filterTextInputGurustaff'
        onUserInput={this.handleUserInput}
        filterTextValue={this.state.filterText}
        listData={this.state.listData}
      >
        <GurustaffTable
          listData={this.state.listData}
          filterTextValue={this.state.filterText}
          onClickEdit={this._onClickEdit}
        />
      </ListData>
    );
  }
}

function mapStateToProps(state) {
  // const students = _.map(state.GurustaffReducer.listData, (val, uid) => {
  //   console.log('');
  //   return { ...val, uid };
  // });
  return {
    listData: state.GurustaffReducer.listData,
    GurustaffReducer: state.GurustaffReducer,
    SettingReducer: state.SettingReducer
    // dataUsersReducer: state.dataUsersReducer,
    // sessionReducer: state.sessionReducer,
    // appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAll,
      openModalFormUpdateData
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GurustaffListDataContainer);
