import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ content }) => (
  content && (<img src={content} alt="question" className="img-fluid" data-test="image-self" />)
);

Image.propTypes = { content: PropTypes.string.isRequired };

export default Image;
