
import { Component } from 'react';
import Render from './MemberRender';

class Member extends Component {
  render() {
    return Render.call(this, this.props, this.state);
  }
}

export default Member;
