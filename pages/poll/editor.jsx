import React, { Component } from 'react';

import PollEditor from '../../containers/PollEditor';

class PollEditorPage extends Component {
  static getInitialProps = async function (context) {
    if (context.query !== undefined) {
      const { slug } = context.query;
      return { slug };
    }
    return {};
  }

  render() {
    return (
      <PollEditor slug={this.props.slug} />
    );
  }
}

export default PollEditorPage;
