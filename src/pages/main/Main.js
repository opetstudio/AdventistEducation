import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  BackHandler
} from 'react-native';

// import * as fetchData from '../../actions/fetchData';
import * as authenticationAction from '../../actions/AuthenticationActions';
import Render from './MainRender';
import Base from './MainBase';

class Main extends Base {
  constructor(props) {
    super(props);
    console.log('');
  }
  componentWillMount() {
    this._componentWillMount();
    // BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    // console.log('MainBase.render invoked');
    // this.setState({
    //   section: 1
    // });
    // console.log('MainBase.componentWillMount invoked');

    // const that = this;
    // this.props.resetAuthenticationReducer();
    // setTimeout(() => {
    //   console.log('setTimeout');
    //   that._gotoLoginPage();
    // }, 2000);
  }
  render() {
    console.log('Login render');
    return Render.call(this, this.props, this.state);
  }
}

function mapStateToProps(state) {
  return {
    authenticationReducer: state.authenticationReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authenticationAction, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
