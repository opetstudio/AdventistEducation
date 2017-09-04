import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Base from './ChatsContainerBase';
import Render from './ChatsContainerRender';

import * as AppActions from '../../actions/AppActions';

class ChatsContainer extends Base {
  componentWillMount() {
      this.props.conversationUserFetch();
      this.setDataSource(this.props.conversations);
      // console.log('componentWillMount = ', this.props.conversations);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('[ChatsContainer.componentWillReceiveProps] ==>', nextProps);
    // if (this.props.contactEmail !== nextProps.contactEmail) {
    //     this.props.userChatsFetch(nextProps.contactEmail);
    // }
    this.setDataSource(nextProps.conversations);
  }
  render() {
    return Render.call(this, this.props, this.state);
  }
}

function mapStateToProps(state) {
  const conversations = _.map(state.listChatsReducer, (val, uid) => {
    console.log('');
    return { ...val, uid };
  });
  // console.log('chatsssss=>', conversations);
  return {
    conversations,
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
)(ChatsContainer);
