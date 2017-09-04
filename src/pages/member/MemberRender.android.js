'use strict';

import Render from './MemberRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
