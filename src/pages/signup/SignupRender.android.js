'use strict';

import Render from './SignupRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
