import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button, Loader, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListAbsenTable from '../components/ListAbsenTable';
import ListData from '../components/ListData';
import * as AdminAction from '../actions/AdminAction';
// import './ContentTop.css';

class ListDataSiswa extends Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
      inStockOnly: false,
      data: [
        { name: 'Nofrets', kelas: '1-IPA-A', jam: '07:00' },
        { name: 'Vina', kelas: '1-IPA-A', jam: '07:00' },
        { name: 'Avi', kelas: '1-IPA-A', jam: '07:00' },
        { name: 'Aca', kelas: '1-IPA-A', jam: '07:00' },
      ]
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }
  componentWillMount() {
    // this.setState({
    //   menuVerticalLeftVisibility: 'hidden',
    //   menuVerticalRightVisibility: 'hidden'
    // });
    // this.props.modificationTitleAdmin('HALAMAN ADMIN');
    // console.log('admin page componentWillMount props====>>>>>', this.props);
    // this.props.modificationTitleAdmin('ABSENSI DIGITAL');
    // console.log('list contacts via props==>', this.props.contacts);
  }
  handleUserInput(filterText, inStockOnly) {
    //select * from data where name like 'filterText'

    this.setState({
      filterText,
      inStockOnly,
    });
  }
  render() {
    return (
      <ListData
        title="Siswa"
        headerTitleBackgroundColor='#00bff3'
        filterTextInput='filterTextInputSiswa'
        onUserInput={this.handleUserInput}
        filterTextValue={this.state.filterText}
        listData={this.state.data}
      >
        <ListAbsenTable
          listData={this.state.data}
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
    dataUsersReducer: state.dataUsersReducer,
    sessionReducer: state.sessionReducer,
    appReducer: state.appReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(AdminAction, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDataSiswa);
