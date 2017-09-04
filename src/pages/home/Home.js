import Render from './HomeRender';
import Base from './HomeBase';

export default class Home extends Base {
  render() {
    console.log('Home render');
    return Render.call(this, this.props, this.state);
  }
}
