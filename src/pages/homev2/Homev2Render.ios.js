'use strict';

import Render from './Homev2Render.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
