import React, { Component } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import {
  CardTitle,
  CardSubtitle,
  FormGroup,
  InputGroup,
  Input,
  InputGroupText,
  InputGroupAddon,
  Button,
} from 'reactstrap';

const ButtonList = styled.div`
    display:flex;
    flex-direction: column;
    padding: 0.5rem;
`;

const Header = styled.div`
    margin: 1rem;
`;

class Login extends Component {
  render() {
    const {
      validationSchema, postLogin, pageHandle,
    } = this.props;
    return (
      <>
        <Header>
          <CardTitle tag="h3">Oturum aç</CardTitle>
          <CardSubtitle>Bilemezsin Hesabınızı kullanın</CardSubtitle>
        </Header>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            postLogin(values);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="input-span">Email</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="email"
                      placeholder="mail adresinizi giriniz..."
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? 'input-with-span error'
                          : 'input-with-span'
                      }
                    />
                  </InputGroup>
                  {errors.email && touched.email && (
                  <div className="input-feedback field-error">
                    {errors.email}
                  </div>
                  )}

                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="input-span">Şifre</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="password"
                      placeholder="şifrenizi giriniz..."
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? 'input-with-span error'
                          : 'input-with-span'
                      }
                    />
                  </InputGroup>
                  {errors.password && touched.password && (
                  <div className="input-feedback field-error">
                    {errors.password}
                  </div>
                  )}
                </FormGroup>
                <ButtonList>
                  <div>
                    <Button type="submit" color="info">Giriş Yap </Button>
                    {' '}
                    <Button type="button" onClick={() => pageHandle('signup')} color="secondary">Kayıt Ol</Button>
                  </div>
                  <div>
                    <Button color="link" onClick={() => pageHandle('reset-password')}>şifremi unuttum</Button>
                  </div>
                </ButtonList>
              </form>
            );
          }}
        </Formik>
      </>
    );
  }
}

Login.propTypes = {
  validationSchema: PropTypes.object.isRequired,
  postLogin: PropTypes.func.isRequired,
  pageHandle: PropTypes.func.isRequired,
};

export default Login;
