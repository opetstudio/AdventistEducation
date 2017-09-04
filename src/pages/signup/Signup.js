import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

// import * as fetchData from '../../actions/fetchData';
import * as authenticationAction from '../../actions/AuthenticationActions';
import Render from './SignupRender';
import Base from './SignupBase';

class Signup extends Base {
  componentWillMount() {
      if (firebase.auth().currentUser != null) Actions.pop();
      this.props.resetSignupForm();
      this._componentWillMount();
  }
  render() {
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
)(Signup);
