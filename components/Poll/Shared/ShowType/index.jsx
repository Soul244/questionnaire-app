import React from 'react';
import PropTypes from 'prop-types';
import SideBySide from './SideBySide';
import Full from './Full';

function index({ showType, ...rest }) {
  if (showType === 'full') {
    return <Full {...rest} />;
  }
  return <SideBySide {...rest} />;
}

index.propTypes = {
  showType: PropTypes.oneOf(['sideBySide', 'full']).isRequired,
};

export default index;
