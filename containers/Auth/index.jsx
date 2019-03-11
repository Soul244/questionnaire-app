import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

const LogoContainer = styled.div`
  background-image: url(${props => props.src});
  height: 200px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.bg ? '#F0F0F0' : '#fff')};
  position: relative;
  :before{
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(23, 162, 184,0.2);
  }
`;

const Logo = styled.img`
  width: 75px;
  border-radius: 75px;
  box-shadow: 5px 10px 5px 0px rgba(0,0,0,0.25);
  height: auto;
`;

const CardBodyStyled = styled(CardBody)`
  padding: 1rem 4rem 4rem 4rem !important;
  @media (max-width: 576px) {
    padding: 1rem !important;
  }
`;

class Auth extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    userActions: PropTypes.shape({
      postLogin: PropTypes.func.isRequired,
      postSignUp: PropTypes.func.isRequired,
      postResetPassword: PropTypes.func.isRequired,
    }),
  };

  constructor() {
    super();
    this.state = {
      page: 'login',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.notify(nextProps.user.message);
    const { token } = nextProps.user;
    if (token) {
      setTimeout(() => {
        Router.push({ pathname: '/dashboard/anketlerim' });
      }, 2000);
    }
  }

  notify = (message) => {
    if (message) {
      toast.info(message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    this.props.user.message = '';
  };

  pageHandle = (page) => {
    this.setState({
      page,
    });
  };

  render() {
    const { postLogin, postSignUp, postResetPassword } = this.props.userActions;
    const { page } = this.state;
    return (
      <Container className="text-center mt-4">
        <Row>
          <Col lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }}>
            <Card>
              <LogoContainer src="/static/image_3.webp">
                <Logo src="/static/bilemezsin-logo.jpg" />
              </LogoContainer>
              <CardBodyStyled>
                <>
                  <ToastContainer autoClose={2000} />
                  {page === 'login' && (
                    <Login
                      postLogin={postLogin}
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
                      postResetPassword={postResetPassword}
                      pageHandle={this.pageHandle}
                      validationSchema={ResetPasswordSchema}
                    />
                  )}
                </>
              </CardBodyStyled>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
