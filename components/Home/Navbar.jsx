import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Nav, NavItem, NavLink, Container,
} from 'reactstrap';

const NavStyled = styled(Nav)`
  position: sticky;
  width: 100%;
  height: 48px;
  padding: auto 0;
  top: 0;
  background-color: #33d2ff;
  z-index: 99;
`;

const NavLinkStyled = styled(NavLink)`
  color: white;
  font-size: 1rem;
  :hover {
    color: lightgrey;
  }
  @media(max-width: 576px){
    font-size: 0.85rem;
  }
`;

const ContainerStyled = styled(Container)`
  display: flex;
  flex-direction: row;
  margin-top: auto;
  margin-bottom: auto;
  justify-content: space-around;
`;

function Navbar({ items }) {
  return (
    <NavStyled>
      <ContainerStyled>
        {items.map(item => (
          <NavItem>
            <NavLinkStyled href={item.href}>{item.name}</NavLinkStyled>
          </NavItem>
        ))}
      </ContainerStyled>
    </NavStyled>
  );
}

Navbar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Navbar;
