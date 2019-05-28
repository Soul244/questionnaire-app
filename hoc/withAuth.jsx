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
      const token = localStorage.getItem('token');
      if (!token && token === '') {
        this.BackLoginPage();
      } else {
        axios.post('/users/token', {
          token,
        })
          .then((response) => {
            const { isTokenValid } = response.data;
            if (!isTokenValid) {
              this.BackLoginPage();
              localStorage.setItem('token', '');
            }
          })
          .catch(() => {
            this.BackLoginPage();
            localStorage.setItem('token', '');
          });
      }
    }

    BackLoginPage = () => {
      Router.push({ pathname: '/giris-yap' });
    }

    render() {
      const { isTokenValid } = this.state;
      return <WrappedComponent isTokenValid={isTokenValid} {...this.props} />;
    }
  };
}

export default withAuth;
