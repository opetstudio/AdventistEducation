import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SiswaTable extends Component {
  render() {
    const rows = [];
    this.props.listData.forEach((row) => {
      if (
        row.name.indexOf(this.props.filterTextValue) === -1
        && row.last_name.indexOf(this.props.filterTextValue) === -1
      ) {
        return;
      }
      rows.push(
        <tr key={row.nis} >
          <td>{row.name} {row.last_name}</td><td>{row.kelas}</td><td>{row.nis}</td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Nis</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

SiswaTable.propTypes = {
  listData: PropTypes.array,
  filterTextValue: PropTypes.string.isRequired,
};

export default SiswaTable;
