import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import {
  NavItem,
  NavLink,
} from 'reactstrap';
import styled from 'styled-components';

const NavLinkCursor = styled(NavLink)`
  cursor: pointer !important;
  color:white !important;
`;

function Logged({ logOut }) {
  return (
    <>
      <NavItem>
        <Link as="/dashboard/editor/yeni-anket" href="/dashboard/editor">
          <NavLinkCursor>Yeni Anket Oluştur</NavLinkCursor>
        </Link>
      </NavItem>
      <NavItem>
        <Link as="/giris-yap" href="/auth">
          <NavLinkCursor onClick={logOut}>Çıkış Yap</NavLinkCursor>
        </Link>
      </NavItem>
    </>
  );
}

Logged.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default Logged;
