import React from 'react';
import PropTypes from 'prop-types';

function Audio(props) {
  const { content } = props;
  return (
    <audio controls>
      <source src={content} type="audio/ogg" />
      <p> Your browser does not support the audio element.</p>
    </audio>
  );
}

export default Audio;
