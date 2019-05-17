import React from 'react';
import Link from 'next/link';

import {
  NavItem,
  NavLink,
} from 'reactstrap';
import styled from 'styled-components';

const NavLinkCursor = styled(NavLink)`
  cursor: pointer !important;
  font-size: 1rem !important;
  color:white !important;
`;

function Anonim() {
  return (
    <>
      <NavItem>
        <Link as="/giris-yap" href="/auth">
          <NavLinkCursor>Ücretsiz hesap</NavLinkCursor>
        </Link>
      </NavItem>
      <NavItem>
        <Link as="/giris-yap" href="/auth">
          <NavLinkCursor>Giriş yap</NavLinkCursor>
        </Link>
      </NavItem>
    </>
  );
}

export default Anonim;
