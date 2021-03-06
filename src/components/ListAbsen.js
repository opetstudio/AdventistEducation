import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ListAbsen.css';

class ListAbsen extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    // console.log('filterTextInput='+this.refs.filterTextInput.value);
    this.props.onUserInput(this.refs[this.props.filterTextInput].value, '');
  }
  render() {
    const totalCheckIn = this.props.dataAbsen.length;
    return (
      <div className='listAbsenWrapper'>

        <div className='listAbsenHeader'>
          <div
            className='listAbsenHeaderTitle'
            style={{ backgroundColor: this.props.headerTitleBackgroundColor }}
          >
              <span>{this.props.title}</span>
          </div>
          <div className='listAbsenTotalCheckin'>
              <span>Total Check In: {totalCheckIn}</span>
          </div>
        </div>

        <div className="scroll">
          <input
            type='text'
            name={this.props.filterTextInput}
            value={this.props.filterTextValue}
            placeholder='cari data'
            ref={this.props.filterTextInput}
            onChange={this.handleChange}
          />
          {this.props.children}
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
  title: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired,
  children: PropTypes.node
};

// export default UsersListRender;
export default ListAbsen;
