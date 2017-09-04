import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { fetchData } from '../../../actions/fetchData';
// import * as fetchData from '../../actions/fetchData';
import * as fetchData from '../../actions/fetchData';
import Base from './UsersContainerBase';
import Render from './UsersContainerRender';

class UsersContainer extends Base {
  render() {
    return Render.call(this, this.props, this.state);
  }
}

function mapStateToProps(state) {
  return {
    users: state.dataReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(fetchData, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

// @connect(
//   state => ({
//     image: state.image,
//   }),
//   dispatch => ({
//     actions: { ...bindActionCreators({ fetchImage, changeImage }, dispatch) }
//   }),
// )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);

// export default UsersContainer;
