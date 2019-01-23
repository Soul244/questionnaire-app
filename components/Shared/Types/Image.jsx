import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ content }) => (
  <img src={content} alt="question" className="img-fluid" />
);

export default Image;
