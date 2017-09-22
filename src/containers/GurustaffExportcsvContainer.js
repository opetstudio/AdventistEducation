import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Header, Modal } from 'semantic-ui-react';

import { fetchAllExportToCsv } from '../actions/GurustaffAction';

class GurustaffExportcsvContainer extends Component {
  constructor(props){
    super(props);
    this._onClickButtonTrigger = this._onClickButtonTrigger.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
  }
  componentWillMount(){
    this.setState({
      openModal:false,
      // openModal:this.props.GurustaffExportcsvReducer.openModal,
      exportToCsvInMessage:this.props.GurustaffExportcsvReducer.exportToCsvInMessage
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      // openModal:nextProps.GurustaffExportcsvReducer.openModal,
      exportToCsvInMessage:nextProps.GurustaffExportcsvReducer.exportToCsvInMessage
    });
  }
  _onCloseModal(){
    this.setState({
      openModal:false
    });
  }
  _onClickButtonTrigger(){
    this.setState({
      openModal:true
    });
    this.props.fetchAllExportToCsv(this.props.SettingReducer.neDBDataPath);
  }
  render(){
    return(
      <div>
        <Button
          onClick={() => {
            this._onClickButtonTrigger();
          }}
        >
          Export XLSX
        </Button>
        <Modal
          open={this.state.openModal}
          onClose={this._onCloseModal}
        >
          <Header icon='archive' content='Export to XLSX' />
          <Modal.Content>
            <p>{this.state.exportToCsvInMessage}</p>
          </Modal.Content>
        </Modal>
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
    SettingReducer: state.SettingReducer,
    GurustaffExportcsvReducer: state.GurustaffExportcsvReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllExportToCsv
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GurustaffExportcsvContainer);
