import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class UserTable extends Component {
  constructor(props) {
    super(props);
    this._onClickEdit = this._onClickEdit.bind(this);
  }
  componentWillMount() {
    console.log('[UserTable] componentWillMount=>,', this.props);
    this.setState({
      usersessionDetail: this.props.usersessionDetail
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('[UserTable] componentWillReceiveProps=>,', this.props);
    this.setState({
      usersessionDetail: nextProps.usersessionDetail
    });
  }
  _onClickEdit(row) {
    this.props.onClickEdit(row);
  }
  render() {
    const rows = [];
    if (this.props.listData) {
      this.props.listData.forEach((row) => {
        if(!(this.state.usersessionDetail.user_role < row.user_role)) return;
        if(!row.id) return;
        if (
          row.name.indexOf(this.props.filterTextValue) === -1
          && row.last_name.indexOf(this.props.filterTextValue) === -1
        ) {
          return;
        }
        rows.push(
          <tr key={row.id} >
            <td>{row.name} {row.last_name}</td>
            <td>{row.username}</td>
            <td>{row.password}</td>
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
            <th>Username</th>
            <th>Password</th>
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

UserTable.propTypes = {
  listData: PropTypes.array,
  filterTextValue: PropTypes.string.isRequired,
};

export default UserTable;
