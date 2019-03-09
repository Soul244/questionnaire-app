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

const NavbarBrandStyled = styled(NavbarBrand)`
  display: flex;
  align-items: center;
  color: white !important;
`;

const NavbarStyled = styled(Navbar)`
  position: sticky;
  top: 0;
  z-index: 5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      isLogged: false,
      homeLink: null,
    };
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      this.setState({
        isLogged: true,
      });
    }
    this.setState({
      homeLink: '/dashboard/anketlerim',
    });
  }

  onClick = () => {
    localStorage.setItem('_id', '');
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
    this.setState({
      isLogged: false,
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  toggleDropDownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const { isLogged, homeLink, isOpen } = this.state;
    return (
      <>
        <NavbarStyled className="nav-bg" light expand="md">
          <Container>
            <NavbarBrandStyled href={homeLink}>
              Dashboard
            </NavbarBrandStyled>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isLogged && <Logged logOut={this.onClick} />}
                {!isLogged && <Anonim />}
              </Nav>
            </Collapse>
          </Container>
        </NavbarStyled>
      </>
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
