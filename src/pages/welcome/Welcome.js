import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Render from './WelcomeRender';
import Base from './WelcomeBase';
import * as authenticationAction from '../../actions/AuthenticationActions';

class Welcome extends Base {
  componentWillMount() {
      alert('on page welcome');
  }
  render() {
    console.log('Welcome.render invoked');
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
)(Welcome);
