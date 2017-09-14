import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ListData.css';

class ListData extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    // console.log('filterTextInput='+this.refs.filterTextInput.value);
    this.props.onUserInput(this.refs[this.props.filterTextInput].value);
  }
  render() {
    let total = 0;
    if (this.props.listData) {
      total = this.props.listData.length;
    }
    return (
      <div className='listDataWrapper'>

        <div className='listDataHeader'>
          <div
            className='listDataHeaderTitle'
            style={{ backgroundColor: this.props.headerTitleBackgroundColor }}
          >
              <span>{this.props.title}</span>
          </div>
          <div className='listDataTotal'>
              <span>Total: {total}</span>
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
ListData.propTypes = {
  listData: PropTypes.array,
  title: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired,
  children: PropTypes.node
};

// export default UsersListRender;
export default ListData;
