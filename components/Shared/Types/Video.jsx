import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';


const Video = ({ content }) => (
  <div>
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={content}
        width="70%"
        height="100%"
        style={{ margin: 'auto' }}
      />
    </div>
  </div>
);

export default Video;
