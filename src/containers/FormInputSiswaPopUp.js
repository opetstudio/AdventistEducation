import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormInputPopUp from '../components/FormInputPopUp';
import FormInputSiswa from '../components/FormInputSiswa';

import { saveDataSiswa } from '../actions/DataSiswaAction';

class FormInputSiswaPopUp extends Component {
  constructor(props) {
    super(props);
    this._onClickButtonSaveData = this._onClickButtonSaveData.bind(this);
  }
  componentWillMount() {
    console.log('FormInputSiswaPopUp.componentWillMount props==>', this.props);
    this.setState({
      neDBDataPath: this.props.SettingReducer.neDBDataPath,
      isSuccess: false,
      isError: false,
      formMessage: 'Masukan data dengan baik dan benar.',
    });
  }
  _onClickButtonSaveData(data, callback) {
    // if (this.props.isCreateNew) {
        this.props.saveDataSiswa(data, this.state.neDBDataPath, callback);
    // }
  }
  render() {
    console.log('FormInputSiswaPopUp Render');
    return (
      <FormInputPopUp buttonTitle="Input Data Siswa">
        <FormInputSiswa
          onClickButtonSaveData={this._onClickButtonSaveData}
          isCreateNew={this.props.isCreateNew}
        />
      </FormInputPopUp>
    );
  }
}

function mapStateToProps(state) {
  // const users = _.map(state.dataUsersReducer.dataUsers, (val, uid) => {
  //   console.log('');
  //   return { ...val, uid };
  // });
  return {
    SettingReducer: state.SettingReducer,
    DataSiswaReducer: state.DataSiswaReducer
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveDataSiswa
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormInputSiswaPopUp);
