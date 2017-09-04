'use strict';

import Render from './ContactsContainerRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
