import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const Video = ({ content }) => (
  <div
    className="player-wrapper"
    data-test="video-self"
  >
    <ReactPlayer
      className="react-player"
      url={content}
      width="70%"
      height="100%"
      style={{ margin: 'auto' }}
    />
  </div>
);

Video.propTypes = { content: PropTypes.string.isRequired };

export default Video;
