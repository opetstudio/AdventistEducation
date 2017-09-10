import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListAbsenTable extends Component {
  render() {
    const rows = [];
    this.props.listData.forEach((row) => {
      if (row.name.indexOf(this.props.filterTextValue) === -1) {
        return;
      }
      rows.push(
        <tr key={row.name} ><td>{row.name}</td><td>{row.kelas}</td><td>{row.jam}</td></tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kelas</th>
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

ListAbsenTable.propTypes = {
  listData: PropTypes.array,
  filterTextValue: PropTypes.string.isRequired,
};

export default ListAbsenTable;
