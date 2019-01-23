import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import {
  Container, Row, Col, Card, CardBody,
} from 'reactstrap';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';

import * as userActions from '../../redux/actions/userActions';
import {
  LoginSchema,
  SignUpSchema,
  ResetPasswordSchema,
} from '../../validation/validationSchemas';
import { SignUp, Login, ResetPassword } from '../../components/Auth';

const Logo = styled.img`
  width: 75px;
  height: auto;
`;

const CardStyled = styled(Card)`

`;

const CardBodyStyled = styled(CardBody)`
  padding: 4rem !important;
  @media (max-width: 576px) {
    padding: 1rem !important;
  }
`;

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      page: 'login',
    };
    this.pageHandle = this.pageHandle.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    /*
    this.props.postIsTokenValid();
    const { isTokenValid } = this.props.user;
    console.log(isTokenValid);
    if (isTokenValid) {
      window.location.href = '/home';
    } */
  }

  componentWillReceiveProps(nextProps) {
    this.notify(nextProps.user.message);
    const { isTokenValid } = nextProps.user;
    if (isTokenValid === true) {
      setTimeout(() => {
        Router.push({
          pathname: '/dashboard/polls',
        });
      }, 2000);
    }
  }

  notify = (message) => {
    if (message) {
      toast.info(message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    this.props.user.message = '';
  };

  pageHandle(page) {
    this.setState({
      page,
    });
  }

  handleLogin(values) {
    this.props.postLogin(values);
  }

  render() {
    const { postSignUp, postResetPassword } = this.props;
    const { page } = this.state;

    return (
      <Container className="text-center">
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
            <CardStyled>
              <CardBodyStyled>
                <>
                  <Logo src="/static/bilemezsin-logo.jpg" />
                  <ToastContainer autoClose={2000} />
                  {page === 'login' && (
                    <Login
                      postLogin={this.handleLogin}
                      pageHandle={this.pageHandle}
                      validationSchema={LoginSchema}
                    />
                  )}
                  {page === 'signup' && (
                    <SignUp
                      postSignUp={postSignUp}
                      pageHandle={this.pageHandle}
                      validationSchema={SignUpSchema}
                    />
                  )}
                  {page === 'reset-password' && (
                    <ResetPassword
                      pageHandle={this.pageHandle}
                      validationSchema={ResetPasswordSchema}
                      postResetPassword={postResetPassword}
                    />
                  )}
                </>
              </CardBodyStyled>
            </CardStyled>
          </Col>
        </Row>
      </Container>
    );
  }
}

Auth.propTypes = {
  postLogin: PropTypes.func.isRequired,
  postSignUp: PropTypes.func.isRequired,
  postResetPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  userActions,
)(Auth);
