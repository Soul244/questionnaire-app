import React, { Component } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import {
  CardTitle, FormGroup, InputGroup, Button,
} from 'reactstrap';
import styled from 'styled-components';

import { CustomInput } from '../Shared';

const Header = styled.div`
    margin: 1rem;
`;

class SignUp extends Component {
  render() {
    const {
      validationSchema, postSignUp, pageHandle,
    } = this.props;
    return (
        <>
          <Header>
            <CardTitle tag="h3">Kayıt Ekranı</CardTitle>
          </Header>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              postSignUp(values);
            }}
          >
            {(props) => {
              const {
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
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
                  <Button type="submit" color="info">Kayıt Ol</Button>
                  {' '}
                  <Button type="button" onClick={() => pageHandle('login')} color="secondary">Geri Dön</Button>
                </form>
              );
            }}
          </Formik>
    </>
    );
  }
}

SignUp.propTypes = {
  validationSchema: PropTypes.object.isRequired,
  postSignUp: PropTypes.func.isRequired,
  pageHandle: PropTypes.func.isRequired,
};

export default SignUp;
