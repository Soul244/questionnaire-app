import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import styled from 'styled-components';

import * as userActions from '../../../redux/actions/userActions';
import Logged from './Logged';
import Anonim from './Anonim';


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

class index extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleDropDownToggle = this.toggleDropDownToggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      isLogged: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('auth') !== '') {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (auth.isTokenValid) {
        this.setState({
          isLogged: true,
        });
      }
    }
  }

  onClick() {
    localStorage.setItem('auth', '');
    this.setState({
      isLogged: false,
    });
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
    const { isLogged } = this.state;
    return (
      <NavbarStyled className="nav-bg" light expand="md">
        <Container>
          <NavbarBrandStyled href="/">
            <img src="/static/bilemezsin-logo.jpg" style={{ width: '32px', height: '32px' }} alt="logo" />
          </NavbarBrandStyled>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isLogged && (
              <Logged logOut={this.onClick} />
              )}
              {!isLogged && (
              <Anonim />
              )}
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
)(index);
