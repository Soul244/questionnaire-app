import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Card, CardBody } from 'reactstrap';

const CardStyled = styled(Card)`
  height: 100%;
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
      <CardStyled>
        <CardBody>
          {items.map(item => (
            <NavItem>
              <Link href={item.href}>
                <LinkStyled>{item.name}</LinkStyled>
              </Link>
            </NavItem>
          ))}
        </CardBody>
      </CardStyled>
    );
  }
}
