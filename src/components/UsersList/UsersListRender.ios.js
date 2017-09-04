'use strict';

import Render from './UsersListRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
