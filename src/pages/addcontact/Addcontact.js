
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Render from './AddcontactRender';
import Base from './AddcontactBase';
import * as AppActions from '../../actions/AppActions';

class Addcontact extends Base {
  componentWillMount() {
    if (firebase.auth().currentUser == null) Actions.pop();
    this.props.resetAppReducer();
  }
  render() {
    return Render.call(this, this.props, this.state);
  }
}

function mapStateToProps(state) {
  return {
    appReducer: state.appReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Addcontact);
