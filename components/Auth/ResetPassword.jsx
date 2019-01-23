import React, { Component } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import {
  CardTitle,
  FormGroup,
  InputGroup,
  Input,
  InputGroupText,
  InputGroupAddon,
  Button,
} from 'reactstrap';
import styled from 'styled-components';

const Header = styled.div`
    margin: 1rem;
`;

class ResetPassword extends Component {
  render() {
    const {
      validationSchema, postResetPassword, pageHandle,
    } = this.props;
    return (
      <>
        <Header>
          <CardTitle tag="h3">Şifre Sıfırla</CardTitle>
        </Header>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            postResetPassword(values.email);
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
                <Button type="submit" color="info">Şifremi Sıfırla</Button>
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

ResetPassword.propTypes = {
  validationSchema: PropTypes.objectOf.isRequired,
  postResetPassword: PropTypes.func.isRequired,
  pageHandle: PropTypes.func.isRequired,
};

export default ResetPassword;
