import React from 'react';
import { Navbar } from '../components/Shared';

const withJustNavbar = WrappedComponent => props => (
  <>
    <Navbar />
    <WrappedComponent {...props} />
  </>
);

export default withJustNavbar;
