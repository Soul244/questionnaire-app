import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import {
  CardTitle,
  FormGroup,
  InputGroup,
  Button,
} from 'reactstrap';
import { CustomInput, SpinnerButton } from '~components/Shared';

const ButtonList = styled.div`
    display:flex;
    flex-direction: column;
`;

const Header = styled.div`
    margin: 1rem 1rem 2rem 1rem;
`;

function Login({
  validationSchema, postLogin, pageHandle, fetched, fetching,
}) {
  return (
    <>
      <Header>
        <CardTitle tag="h3">Oturum aç</CardTitle>
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
        {(data) => {
          const {
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = data;
          return (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup>
                  <CustomInput
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputLabel="Mail Adresi"
                    error={errors.email}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <CustomInput
                    id="password"
                    inputLabel="Şifre"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                  />
                </InputGroup>
              </FormGroup>
              <ButtonList>
                <div>
                  <SpinnerButton fetched={fetched} fetching={fetching} type="submit" color="info">Giriş Yap</SpinnerButton>
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

Login.propTypes = {
  validationSchema: PropTypes.object.isRequired,
  postLogin: PropTypes.func.isRequired,
  pageHandle: PropTypes.func.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default Login;
