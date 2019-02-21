import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ content }) => (
  content && (<img src={content} alt="question" className="img-fluid" />)
);

Image.propTypes = { content: PropTypes.string.isRequired };

export default Image;
