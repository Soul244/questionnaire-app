import React from 'react';
import { Navbar } from '../components/Shared';


const withNavbar = WrappedComponent => props => (
  <>
    <Navbar />
    <WrappedComponent {...props} />
  </>
);

export default withNavbar;
