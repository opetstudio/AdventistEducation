import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text
} from 'react-native';

const UsersListRender = ({ title, children }) => (
    <View>
      <Text>{title}</Text>
      <View>{children}</View>
    </View>
);

UsersListRender.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
};

export default UsersListRender;
