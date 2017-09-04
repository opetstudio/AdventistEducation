'use strict';

import Render from './LoginRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
