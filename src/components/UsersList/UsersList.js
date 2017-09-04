
import { Component } from 'react';
import Render from './UsersListRender';

export default class UsersList extends Component {
  render() {
    return Render.call(this, this.props, this.state);
  }
}
