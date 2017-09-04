'use strict';

import Render from './HomeRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
