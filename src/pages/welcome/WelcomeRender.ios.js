'use strict';

import Render from './WelcomeRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
