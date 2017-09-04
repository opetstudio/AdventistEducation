'use strict';

import Render from './UsersContainerRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
