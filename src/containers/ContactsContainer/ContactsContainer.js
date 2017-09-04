import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Base from './ContactsContainerBase';
import Render from './ContactsContainerRender';
import * as AppActions from '../../actions/AppActions';

class ContactsContainer extends Base {
  constructor(props) {
    super(props);
    this._setDataSource = this._setDataSource.bind(this);
    // this.state = {
    //   seconds: 5,
    // };
  }
  componentWillMount() {
    this.props.userContactsFetch();
    this._setDataSource(this.props.contacts);
    // console.log('list contacts via props==>', this.props.contacts);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('[ContactsContainer.componentWillReceiveProps] ==>', nextProps);
    this._setDataSource(nextProps.contacts);
  }
  render() {
    return Render.call(this, this.props, this.state);
  }
}

function mapStateToProps(state) {
  const contacts = _.map(state.listContactsReducer, (val, uid) => {
    console.log('');
    return { ...val, uid };
  });
  // console.log(contacts);
  return { contacts };
  // return {
  //   listContactsReducer: state.listContactsReducer
  // };
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
)(ContactsContainer);
