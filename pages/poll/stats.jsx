import React, { Component } from 'react';

import Statistics from '../../containers/Statistics';

class statistics extends Component {
  static getInitialProps = async function (context) {
    if (context.query !== undefined) {
      const { slug } = context.query;
      return { slug };
    }
    return {};
  }

  render() {
    return (
      <Statistics slug={this.props.slug} />
    );
  }
}

export default statistics;
