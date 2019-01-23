import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';


import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import styled from 'styled-components';

import * as userActions from '../../redux/actions/userActions';

const NavLinkCursor = styled(NavLink)`
  cursor: pointer !important;
`;

const LogoText = styled.p`
  margin-left:0.5rem;
  margin-bottom:0;
  font-size: 1rem;
`;

const NavbarBrandStyled = styled(NavbarBrand)`
  display:flex;
  align-items: center;
`;

const NavbarStyled = styled(Navbar)`
  position:sticky;
  top: 0;
  z-index:5;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

class MyNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleDropDownToggle = this.toggleDropDownToggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
    };
  }

  onClick() {
    localStorage.setItem('auth', '');
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  toggleDropDownToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <NavbarStyled color="light" light expand="md">
        <Container>
          <NavbarBrandStyled href="/dashboard/polls">
            <img src="/static/bilemezsin-logo.jpg" style={{ width: '32px', height: '32px' }} alt="logo" />
            <LogoText>Bilemezsin Questionnaire</LogoText>
          </NavbarBrandStyled>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link href="/dashboard/polls">
                  <NavLinkCursor>Anketlerim</NavLinkCursor>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/dashboard/polls/editor">
                  <NavLinkCursor>Yeni Anket Oluştur</NavLinkCursor>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/dashboard/login">
                  <NavLinkCursor onClick={this.onClick}>Çıkış Yap</NavLinkCursor>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </NavbarStyled>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  userActions,
)(MyNavbar);
