'use strict';

import Render from './MainRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
