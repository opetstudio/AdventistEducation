
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import * as fetchData from '../../actions/fetchData';
import {
  modificationPhoneNumber,
  submitPhoneNumber,
  modificationVerifyCode,
  reEnterPhoneNumber,
  reSmsVerificationCode,
  resetInputVerificationForm
} from '../../actions/LoginWithPhoneNumberActions';
// import * as AuthenticationActions from '../../actions/AuthenticationActions';
import Render from './LoginWithPhoneNumberRender';
import Base from './LoginWithPhoneNumberBase';

class LoginWithPhoneNumber extends Base {
  constructor(props) {
    super(props);
    console.log('[constructor]');
  }
  componentWillMount() {
    console.log('[componentWillMount]');
    this.props.resetInputVerificationForm();
  }
  render() {
    console.log('[render]');
    return Render.call(this, this.props, this.state);
  }
}

function mapStateToProps(state) {
  return {
    sessionReducer: state.sessionReducer,
    authenticationReducer: state.authenticationReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      modificationPhoneNumber,
      submitPhoneNumber,
      modificationVerifyCode,
      reEnterPhoneNumber,
      reSmsVerificationCode,
      resetInputVerificationForm
    }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWithPhoneNumber);
