import Base from './ChattingContainerBase';
import Render from './ChattingContainerRender';

export default class ChattingContainer extends Base {
  render() {
    return Render.call(this, this.props, this.state);
  }
}
