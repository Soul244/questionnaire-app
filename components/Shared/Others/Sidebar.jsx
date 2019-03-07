import React, { Component } from 'react';
import Router from 'next/router';
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

Router.events.on('routeChangeStart', (err, url) => {
  console.log(`Route to ${url}`);
});

export default class Sidebar extends Component {
  render() {
    const { items } = this.props;
    return (
      <CardStyled>
        <CardBody>
          {items.map((item, index) => (
            <NavItem key={index}>
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
