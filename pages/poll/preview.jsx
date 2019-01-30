import React, { Component } from 'react';

import Preview from '../../containers/Preview';

class PreviewPage extends Component {
  static getInitialProps = async function (context) {
    const { ispreview } = context.query;
    return { ispreview };
  }

  render() {
    return (
      <Preview isPreview={this.props.ispreview} />
    );
  }
}

export default PreviewPage;
