import Render from './HomeRender';
import Base from './HomeBase';

export default class Home extends Base {
  constructor(props) {
    super(props);
    this.state = {
      redirect: true
    };
    // console.log('this.state: ', this.state);
  }
  componentDidMount() {
    //goto login
  }
  render() {
    console.log('Home render');
    return Render.call(this, this.props, this.state);
  }
}
