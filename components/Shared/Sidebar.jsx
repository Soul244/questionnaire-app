import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Card, CardBody } from 'reactstrap';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  border-right: 1px solid lightgray;
  height: 100%;
  background-color: #fff;
  padding-top: 1.5rem;
`;

const NavItem = styled.div`
  padding: 0.5rem 1rem;
  :hover {
    cursor: pointer;
  }
`;

const LinkStyled = styled.a`
  color: gray;
  :hover {
    text-decoration: none;
    color: #009fd4
  }
`;

export default class Sidebar extends Component {
  render() {
    const { items } = this.props;
    return (
      <Card>
        <CardBody>
          {items.map(item => (
            <NavItem>
              <Link href={item.href}>
                <LinkStyled>{item.name}</LinkStyled>
              </Link>
            </NavItem>
          ))}
        </CardBody>
      </Card>
    );
  }
}
