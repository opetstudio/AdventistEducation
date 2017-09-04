'use strict';

import Render from './TabBarMenuRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
