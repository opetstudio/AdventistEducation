'use strict';

import Render from './ChatsContainerRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
