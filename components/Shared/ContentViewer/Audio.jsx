import React from 'react';
import PropTypes from 'prop-types';

const Audio = ({ content }) => (
  <audio controls>
    <source src={content} type="audio/ogg" data-test="audio-self" />
    <p> Your browser does not support the audio element.</p>
  </audio>
);

Audio.propTypes = { content: PropTypes.string.isRequired };

export default Audio;
