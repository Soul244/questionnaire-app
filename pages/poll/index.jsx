import React, { Component } from 'react';

import Poll from '../../containers/Poll';

class index extends Component {
  static getInitialProps = async (context) => {
    const { slug } = context.query;
    return { slug };
  }

  render() {
    return (
      <Poll slug={this.props.slug} />
    );
  }
}

export default index;
