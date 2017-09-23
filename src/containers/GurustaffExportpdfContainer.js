import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Header, Modal, Table, Icon } from 'semantic-ui-react';

import { fetchAllExportToPdf } from '../actions/GurustaffAction';

import './GurustaffExportpdfContainer.css';

class GurustaffExportpdfContainer extends Component {
  constructor(props){
    super(props);
    this._onClickButtonTrigger = this._onClickButtonTrigger.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this._renderTable = this._renderTable.bind(this);
    this._processToPdf = this._processToPdf.bind(this);
    this._onClickModal = this._onClickModal.bind(this);
  }
  componentWillMount(){
    this.setState({
      openModal:false,
      listData: this.props.listData,
      // openModal:this.props.GurustaffExportcsvReducer.openModal,
      exportToPdfInMessage:this.props.GurustaffExportpdfReducer.exportToPdfInMessage
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      listData: nextProps.listData,
      // openModal:nextProps.GurustaffExportcsvReducer.openModal,
      exportToPdfInMessage:nextProps.GurustaffExportpdfReducer.exportToPdfInMessage
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
    // this.props.fetchAllExportToPdf(this.props.SettingReducer.neDBDataPath);
  }
  _processToPdf(){
    this.props.fetchAllExportToPdf(this.props.SettingReducer.neDBDataPath);
  }
  _renderTable(){
    const rows = [];
    if (this.state.listData) {
      this.state.listData.forEach((row) => {
        rows.push(
          <Table.Row key={row.nip} >
            <Table.Cell>{row.name} {row.last_name}</Table.Cell>
            <Table.Cell>{row.jabatan}</Table.Cell>
            <Table.Cell>{row.nip}</Table.Cell>
          </Table.Row>
        );
      });
    }
    return(
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Jabatan</Table.HeaderCell>
            <Table.HeaderCell>NIP</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    );
  }
  _renderTable2(){
    const rows = [];
    if (this.state.listData) {
      this.state.listData.forEach((row) => {
        rows.push(
          <tr key={row.nip} >
            <td>{row.name} {row.last_name}</td>
            <td>{row.jabatan}</td>
            <td>{row.nip}</td>
          </tr>
        );
      });
    }
    return(
      <table className='report'>
          <tr>
            <th>Name</th>
            <th>Jabatan</th>
            <th>NIP</th>
          </tr>
          {rows}
      </table>
    );
  }
  _onClickModal(e){
    // console.log('eee=>', e.target);
    // console.log('eee id=>', e.target.id);
    if (e.target.id === 'myModal') {
        // modal.style.display = "none";
        this._onCloseModal();
    }
  }
  render(){
    const modalDisplay = {};
    modalDisplay.display = this.state.openModal ? 'block' : 'none';
    // const modalDisplay = this.state.openModal ? 'block' : 'none';
    // window.onclick = function(event) {
        // if (event.target == modal) {
        //     modal.style.display = "none";
        // }
        // this._onCloseModal();
    // }
    return(
      <div>
        <Button
          onClick={() => {
            this._onClickButtonTrigger();
          }}
        >
          Export PDF
        </Button>
        <div
          id="myModal"
          className="modal"
          style={modalDisplay}
          onClick={e => {this._onClickModal(e);}}
        >
          <div
            className="modal-content"
            onClick={e => {this._onClickModal(e);}}
          >
            <span
              className="close"
              onClick={()=>{this._onCloseModal();}}
            >
              &times;
            </span>
            {this._renderTable2()}
            <Button primary onClick={()=>{this._processToPdf();}}>
              Proceed <Icon name='right chevron' />
            </Button>
          </div>
        </div>
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
    GurustaffExportpdfReducer: state.GurustaffExportpdfReducer,
    listData: state.GurustaffReducer.listData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllExportToPdf
  }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GurustaffExportpdfContainer);
