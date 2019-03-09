import React from 'react';
import styled from 'styled-components';

const Container = styled.div` 
  height: 100%;
  background: white;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 70%;
  max-width: 400px;
  z-index: 200;
  display: ${props => (props.show ? 'block' : 'none')};
  transition: transform 1s ease-out;
`;

const Nav = styled.ul`
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 1s ease-out;

`;

const NavItem = styled.li` 
 margin: 0.5rem 0;
 `;

const Link = styled.a` 
  color: #521751;
  text-decoration: none;
  font-size: 1.2rem;
`;

function Sidebar({ items, show }) {
  return (
    <Container show={show}>
      <Nav>
        {items.map((item, index) => (
          <NavItem key={index}>
            <Link href={item.href}>{item.name}</Link>
          </NavItem>
        ))}
      </Nav>
    </Container>
  );
}

export default Sidebar;
