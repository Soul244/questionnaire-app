import React, { Component } from 'react';
import UserPolls from "../../containers/UserPolls";

class UserPollsPage extends Component {
  static getInitialProps = async (context) => {
    const { userid } = context.query;
    return { userid };
  }

  render() {
    return (
      <UserPolls userid={this.props.userid} />
    );
  }
}

export default UserPollsPage;