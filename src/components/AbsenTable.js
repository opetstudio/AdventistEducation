import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import moment from 'moment';

class AbsenTable extends Component {
  constructor(props) {
    super(props);
    this._onClickEdit = this._onClickEdit.bind(this);
  }
  _onClickEdit(row) {
    // this.props.onClickEdit(row);
  }
  render() {
    const rows = [];
    if (this.props.listData) {
      this.props.listData.forEach((row) => {
        if (
          row.name.indexOf(this.props.filterTextValue) === -1
          && row.last_name.indexOf(this.props.filterTextValue) === -1
        ) {
          return;
        }
        rows.push(
          <tr key={row._id} >
            <td>{row.name} {row.last_name}</td>
            <td>{row.nis || row.nip}</td>
            <td>{moment(row.datetime).format('DD/MM, h:mm:ss a')}</td>
            {/* <td>
              <Button
                onClick={() => { this._onClickEdit(row); }}
              >
                Edit
              </Button>
            </td> */}
          </tr>
        );
      });
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>NIS/NIP</th>
            <th>Jam</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

AbsenTable.propTypes = {
  listData: PropTypes.array,
  filterTextValue: PropTypes.string.isRequired,
};

export default AbsenTable;
