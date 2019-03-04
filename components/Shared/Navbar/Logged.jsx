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

function Logged(props) {
  return (
    <>
      <NavItem>
        <Link
          as="/anket/anketlerim"
          href="/poll/list"
        >
          <NavLinkCursor>Detaylar</NavLinkCursor>
        </Link>
      </NavItem>
      <NavItem>
        <Link as="/anket/editor/yeni-anket" href="/poll/editor">
          <NavLinkCursor>Yeni Anket Oluştur</NavLinkCursor>
        </Link>
      </NavItem>
      <NavItem>
        <Link as="/giris-yap" href="/auth">
          <NavLinkCursor onClick={props.logOut}>Çıkış Yap</NavLinkCursor>
        </Link>
      </NavItem>
    </>
  );
}

export default Logged;
