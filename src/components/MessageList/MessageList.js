import Render from './MessageListRender';
import Base from './MessageListBase';

export default class MessageList extends Base {
  render() {
    return Render.call(this, this.props, this.state);
  }
}
