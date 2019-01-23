import React, { Component } from 'react';

import Poll from '../Poll';
import PreviewControls from '../../components/Preview/PreviewControls';

class index extends Component {
  render() {
    const { isPreview } = this.props;
    return (
      <>
        <PreviewControls />
        <Poll isPreview={isPreview} />
      </>
    );
  }
}

export default index;
