import React from 'react';
import Router from 'next/router';
import axios from '../redux/axios';

function withAuth(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isTokenValid: null,
      };
    }

    componentDidMount() {
      axios.post('/users/token', {
        token: localStorage.getItem('token'),
      })
        .then((response) => {
          const { isTokenValid } = response.data;
          if (!isTokenValid) {
            Router.push({ pathname: '/anasayfa' });
            localStorage.setItem('token', '');
          }
        })
        .catch(() => {
          Router.push({ pathname: '/anasayfa' });
          localStorage.setItem('token', '');
        });
    }

    render() {
      const { isTokenValid } = this.state;
      return <WrappedComponent isTokenValid={isTokenValid} {...this.props} />;
    }
  };
}

export default withAuth;
