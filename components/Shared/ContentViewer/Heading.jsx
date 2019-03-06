import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ content }) => (
  <h1 data-test="heading-self">{content}</h1>
);

Heading.propTypes = { content: PropTypes.string.isRequired };

export default Heading;
