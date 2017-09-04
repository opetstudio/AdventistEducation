'use strict';

import Render from './ChatRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
