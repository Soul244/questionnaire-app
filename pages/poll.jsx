import React, { Component } from 'react';

import Poll from '../containers/Poll';

class index extends Component {
  static getInitialProps = async (context) => {
    const { _id } = context.query;
    return { _id };
  }

  render() {
    return (
      <Poll _id={this.props._id} />
    );
  }
}

export default index;
