import React, { Component } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import {
  CardTitle, FormGroup, InputGroup, Input, InputGroupText, InputGroupAddon, Button,
} from 'reactstrap';
import styled from 'styled-components';

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
                        className={errors.email && touched.email ? 'input-with-span error' : 'input-with-span'}
                      />
                    </InputGroup>
                    {errors.email && touched.email && <div className="input-feedback field-error">{errors.email}</div>}
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
                        className={errors.password && touched.password ? 'input-with-span error' : 'input-with-span'}
                      />
                    </InputGroup>
                    {errors.password && touched.password && <div className="input-feedback field-error">{errors.password}</div>}
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
