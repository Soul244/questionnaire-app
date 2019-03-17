import React, { Component } from 'react';

import Statistics from '../../containers/Statistics';

class StatisticsPage extends Component {
  static getInitialProps = async function (context) {
    if (context.query !== undefined) {
      const { _id } = context.query;
      return { _id };
    }
    return {};
  }

  render() {
    return (
      <Statistics _id={this.props._id} />
    );
  }
}

export default StatisticsPage;
