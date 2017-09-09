import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ListAbsen.css';

class ListAbsen extends Component {
  render() {
    return (
      <div>
        <div className="scroll">
          <table>
            <tr><td>tesss</td></tr>
            <tr><td>tesss</td></tr>
            <tr><td>tesssadsfdsfasdfasfasdfasdfasdfasdfdsafasdfasdfadsfasdfasfadsfasdfasdf</td></tr>
            <tr><td>tesssadsfdsfasdfasfasdfasdfasdfasdfdsafasdfasdfadsfasdfasfadsfasdfasdf</td></tr>
            <tr><td>tesssadsfdsfasdfasfasdfasdfasdfasdfdsafasdfasdfadsfasdfasfadsfasdfasdf</td></tr>
            <tr><td>tesssadsfdsfasdfasfasdfasdfasdfasdfdsafasdfasdfadsfasdfasfadsfasdfasdf</td></tr>
            <tr><td>tesssadsfdsfasdfasfasdfasdfasdfasdfdsafasdfasdfadsfasdfasfadsfasdfasdf</td></tr>
            <tr><td>tesss</td></tr>
            <tr><td>tesss</td></tr>
            <tr><td>tesss</td></tr>
            <tr><td>tesss</td></tr>
          </table>
          </div>
      </div>
    );
  }
}
//
// const UsersListRender = ({ title, children }) => (
//     <View>
//       <Text>{title}</Text>
//       <View>{children}</View>
//     </View>
// );
ListAbsen.propTypes = {
  listData: PropTypes.array,
  title: PropTypes.string.isRequired
};

// export default UsersListRender;
export default ListAbsen;
