import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class GurustaffTable extends Component {
  constructor(props) {
    super(props);
    this._onClickEdit = this._onClickEdit.bind(this);
  }
  _onClickEdit(row) {
    this.props.onClickEdit(row);
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
          <tr key={row.nip} >
            <td>{row.name} {row.last_name}</td>
            <td>{row.jabatan}</td>
            <td>{row.nip}</td>
            <td>
              <Button
                onClick={() => { this._onClickEdit(row); }}
              >
                Edit
              </Button>
            </td>
          </tr>
        );
      });
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>NIP</th>
            <th>Act</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

GurustaffTable.propTypes = {
  listData: PropTypes.array,
  filterTextValue: PropTypes.string.isRequired,
};

export default GurustaffTable;
