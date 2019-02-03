import React from 'react';
import Link from 'next/link';

import {
  NavItem,
  NavLink,
} from 'reactstrap';
import styled from 'styled-components';

const NavLinkCursor = styled(NavLink)`
  cursor: pointer !important;
  color:white !important;
`;

function Anonim() {
  return (
    <>
      <NavItem>
        <Link as="/giris-yap" href="/auth">
          <NavLinkCursor>Giriş Yap</NavLinkCursor>
        </Link>
      </NavItem>
      <NavItem>
        <Link as="/giris-yap" href="/auth">
          <NavLinkCursor>Üye Ol</NavLinkCursor>
        </Link>
      </NavItem>
    </>
  );
}

export default Anonim;
