'use strict';
import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveData } from '../actions/DataAbsenAction';

class AbsenListener extends Component {
  constructor(props) {
    super(props);
    // this.setState({
    //   inputAbsen: ''
    // });
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    console.log('componentWillMount');
    this.setState({
      inputAbsen: ''
    });
  }
  handleChange(value) {
    console.log(value);
    let l = 0;
    if (value !== null || value !== '') {
      l = value.length;
    }
    // console.log('handleChange ', l);
    this.setState({
      inputAbsen: value
    });
    if (l === 6) {
      //submitUsernamePasswordSession
      if (
        this.props.SettingReducer.neDBDataPath === null
        || this.props.SettingReducer.neDBDataPath === '') {
          alert('Directory data belum di set. Silahkan ke halaman pengaturan, ' +
          'dan isi directory database di kolom neDBDataPath. Terima kasih.');
        } else {
          const dataAbsen = {
            id: this.state.inputAbsen,
            checkin: new Date().getTime()
          };
          this.props.saveData(JSON.stringify(dataAbsen),
            this.props.SettingReducer.neDBDataPath);
        }
        this.setState({ inputAbsen: '' });
    }
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
    dataUsersReducer: state.dataUsersReducer,
    sessionReducer: state.sessionReducer,
    appReducer: state.appReducer,
    SettingReducer: state.SettingReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveData
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenListener);
