
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Render from './TabBarMenuRender';
import * as AppActions from '../../actions/AppActions';
import * as authenticationAction from '../../actions/AuthenticationActions';

class TabBarMenu extends Component {
  render() {
    return Render.call(this, this.props, this.state);
  }
}

function mapStateToProps(state) {
  return {
    appReducer: state.appReducer,
    authenticationReducer: state.authenticationReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...AppActions, ...authenticationAction }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBarMenu);
