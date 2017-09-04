import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import PushNotification from 'react-native-push-notification';

import Render from './ChatRender';
import Base from './ChatBase';

import * as AppActions from '../../actions/AppActions';

class Chat extends Base {
  constructor(props) {
    super(props);
    console.log('');
    this.listHeight = 0;
    this.footerY = 0;
  }

  componentWillMount() {
    console.log('Chat.componentWillMount invoked');
    // Set up our two placeholder values.
    this.setState({
      lastRowY: 0,
      listHeight: 0,
      footerY: 0,
      dataSource: [],
      messages: []
    });
    // console.log('constructor ssssssstaaaatttteeeeeeee======>>>>', this.state);
    const { contactEmail } = this.props;
    this.props.userChatsFetch(contactEmail);
    this.setDataSource(this.props.chats);
    if (firebase.auth().currentUser == null) Actions.pop();
    this._componentWillMount();
  }
  componentWillReceiveProps(nextProps) {
    console.log('[Chat.componentWillReceiveProps] ==>', nextProps);
    // alert('page/chat receive props');
    if (this.props.contactEmail !== nextProps.contactEmail) {
      // PushNotification.localNotification({
      //   title: 'Whatsapp Clone',
      //   message: 'ada message baru'
      // });
        this.props.userChatsFetch(nextProps.contactEmail);
    }
    this.setDataSource(nextProps.chats);
  }
  _sendMessage() {
    // console.log('=>this.props=', this.props);
    const message = this.props.appReducer.message;
    const { contactName, contactEmail } = this.props;
    this.props.resetAppReducer();
    console.log('sebelum kirim message');
    const startTime = new Date().getTime();
    this.props.sendMessage(message, contactName, contactEmail);
    const endTime = new Date().getTime();
    const difTime = endTime - startTime;
    console.log(`sesudah kirim message diftime=${difTime}`);
    // this.props.pushNotification({title: `new message from ${}`})
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
  // console.log('chatsssss=>', chats);
  return {
    chats,
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
)(Chat);
