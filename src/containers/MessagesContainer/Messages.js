import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import Base from './MessagesBase';
import Render from './MessagesRender';
import * as AppActions from '../../actions/AppActions';

class Messages extends Base {
  componentWillMount() {
    const { contactEmail } = this.props;
    this.props.userChatsFetch(contactEmail);
    // this.setDataSource(this.props.chats);
    if (firebase.auth().currentUser == null) Actions.pop();
    this._componentWillMount();
  }
  render() {
    return Render.call(this, this.props, this.state);
  }
}

function mapStateToProps(state) {
  const chats = _.map(state.listChattingReducer, (val, uid) => {
    console.log('');
    // console.log('val ===> ', val);
    return { ...val, uid };
  });
  return { chats, appReducer: state.appReducer };
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
)(Messages);
