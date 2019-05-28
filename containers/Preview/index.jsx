import React from 'react';
import PropTypes from 'prop-types';

import Poll from '../Poll';
import PreviewControls from '~components/Preview/PreviewControls';


function index({ isPreview }) {
  return (
    <>
      <PreviewControls />
      <Poll isPreview={isPreview} />
    </>
  );
}

index.propTypes = {
  isPreview: PropTypes.bool.isRequired,
};

export default index;
