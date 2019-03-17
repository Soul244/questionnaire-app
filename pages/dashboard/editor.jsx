import React, { Component } from 'react';
import PollEditor from '../../containers/PollEditor';

class PollEditorPage extends Component {
  static getInitialProps = async function (context) {
    if (context.query !== undefined) {
      const { _id } = context.query;
      return { _id };
    }
    return {};
  };

  render() {
    return <PollEditor _id={this.props._id} />;
  }
}

export default PollEditorPage;
