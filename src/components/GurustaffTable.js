import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class GurustaffTable extends Component {
  constructor(props) {
    super(props);
    this._onClickEditSiswa = this._onClickEditSiswa.bind(this);
  }
  _onClickEditSiswa(row) {
    this.props.onClickEditSiswa(row);
  }
  render() {
    const rows = [];
    console.log('SiswaTable===>', this.props);
    if (this.props.listData) {
      this.props.listData.forEach((row) => {
        if (
          row.name.indexOf(this.props.filterTextValue) === -1
          && row.last_name.indexOf(this.props.filterTextValue) === -1
        ) {
          return;
        }
        rows.push(
          <tr key={row.nis} >
            <td>{row.name} {row.last_name}</td>
            <td>{row.kelas}</td>
            <td>{row.nis}</td>
            <td>
              <Button
                onClick={() => { this._onClickEditSiswa(row); }}
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
            <th>Kelas</th>
            <th>Nis</th>
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
