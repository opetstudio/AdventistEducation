import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button, Loader, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListAbsenTable from '../components/ListAbsenTable';
import ListData from '../components/ListData';
import { fetchAllDataSiswa } from '../actions/DataSiswaAction';
// import './ContentTop.css';

class ListDataSiswa extends Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
      inStockOnly: false,
      data: [
        { name: 'Nofrets', kelas: '1-IPA-A', nis: '35343434' },
      ]
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this._fetchAllDataSiswaResponse = this._fetchAllDataSiswaResponse.bind(this);
  }
  componentWillMount() {
    console.log('[ListDataSiswa.componentWillMount]');
    console.log('[neDBDataPath]', this.props.SettingReducer.neDBDataPath);
    this.props.fetchAllDataSiswa(
      this.props.SettingReducer.neDBDataPath,
      this._fetchAllDataSiswaResponse
    );
    console.log('this.props.DataSiswaReducer.ListDataSiswa===>',
    this.props);
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
    // this.setState({ data: nextProps.DataSiswaReducer.ListDataSiswa });
  }

  handleUserInput(filterText, inStockOnly) {
    //select * from data where name like 'filterText'

    this.setState({
      filterText,
      inStockOnly,
    });
  }
  _fetchAllDataSiswaResponse(e, o) {
    console.log('[ListDataSiswa._fetchAllDataSiswaResponse] ', o);
    // if (o) {
    //   this.setState({ data: o });
    // } else {
    //   this.setState({ data: [] });
    // }
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
        listData={this.props.DataSiswaReducer.ListDataSiswa}
      >
        <ListAbsenTable
          listData={this.props.DataSiswaReducer.ListDataSiswa}
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
    DataSiswaReducer: state.DataSiswaReducer,
    SettingReducer: state.SettingReducer
    // dataUsersReducer: state.dataUsersReducer,
    // sessionReducer: state.sessionReducer,
    // appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchAllDataSiswa }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDataSiswa);
