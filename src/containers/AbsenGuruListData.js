import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AbsenTable from '../components/AbsenTable';
import ListData from '../components/ListData';
import * as AdminAction from '../actions/AdminAction';
// import './ContentTop.css';

class AbsenGuruListData extends Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
      inStockOnly: false,
      data: [
        { nis: 223232, name: 'Opet', kelas: '1-IPA-A', jam: '07:00' },
        { nis: 223233, name: 'Revina', kelas: '1-IPA-A', jam: '07:00' },
        { nis: 223234, name: 'Avigail', kelas: '1-IPA-A', jam: '07:00' },
        { nis: 223235, name: 'Gavriel', kelas: '1-IPA-A', jam: '07:00' },
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
        title="Guru"
        headerTitleBackgroundColor='#c26bd7'
        filterTextInput='filterTextInputGuru'
        onUserInput={this.handleUserInput}
        filterTextValue={this.state.filterText}
        dataAbsen={this.state.data}
      >
        <AbsenTable
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
)(AbsenGuruListData);