'use strict';

import { Component } from 'react';
import Render from './AboutRender';

export default class About extends Component {
  render() {
    console.log('About.render');
    return Render.call(this, this.props, this.state);
  }
}
