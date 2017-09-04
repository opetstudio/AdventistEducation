import React from 'react';
import PropTypes from 'prop-types';

const UsersListRender = ({ title, children }) => (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
);

UsersListRender.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
};

export default UsersListRender;
