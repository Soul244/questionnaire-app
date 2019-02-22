import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';

import * as userActions from '../../redux/actions/userActions';
import {
  LoginSchema,
  SignUpSchema,
  ResetPasswordSchema
} from '../../validation/validationSchemas';
import { SignUp, Login, ResetPassword } from '../../components/Auth';

const Logo = styled.img`
  width: 75px;
  height: auto;
`;

const CardBodyStyled = styled(CardBody)`
  padding: 4rem !important;
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
    })
  };
  
  constructor() {
    super();
    this.state = {
      page: 'login'
    };
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
    const { token } = nextProps.user;
    if (token) {
      setTimeout(() => {
        Router.push({ pathname: '/anasayfa' });
      }, 2000);
    }
  }

  notify = message => {
    if (message) {
      toast.info(message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    this.props.user.message = '';
  };

  pageHandle = page => {
    this.setState({
      page
    });
  };

  render() {
    const { postLogin, postSignUp, postResetPassword } = this.props.userActions;
    const { page } = this.state;
    return (
      <Container className="text-center">
        <Row>
          <Col lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }}>
            <Card>
              <CardBodyStyled>
                <>
                  <Logo src="/static/bilemezsin-logo.jpg" />
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
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
