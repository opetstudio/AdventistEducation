'use strict';

import Render from './AboutRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
