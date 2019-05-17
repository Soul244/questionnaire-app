import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  UncontrolledDropdown,
} from 'reactstrap';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import * as generalActions from '~redux/actions/generalActions';
import Icon, { threedot } from '~css/icons';
import Logged from './Logged';
import Anonim from './Anonim';

const ContainerStyled = styled(Container)`
  padding-left: 30px !important;
  padding-right: 30px !important;
`;

const NavbarBrandStyled = styled(NavbarBrand)`
  display: flex;
  align-items: center;
  color: white !important;
  margin-right: 0;
`;

const NavbarStyled = styled(Navbar)`
  position: sticky;
  top: 0;
  z-index: 5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const SidebarToggle = styled.div`
  margin-right: 0.5rem;
  color:white;
  svg {
      transform: rotate(${props => (props.sideBarShow ? '90deg' : '0deg')});
      transition: transform 0.4s ease;
    }
  :hover{
    cursor: pointer;
  }
`;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      isLogged: false,
    };
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      this.setState({
        isLogged: true,
      });
    }
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
    const { isLogged, isOpen } = this.state;
    const { sideBarToggle, sideBarShow, generalActions } = this.props;
    const { onChangeLanguage } = generalActions;
    return (
      <>
        <NavbarStyled className="nav-bg" light expand="md">
          <ContainerStyled>
            {isLogged && (
            <SidebarToggle onClick={sideBarToggle} sideBarShow={sideBarShow}>
              <Icon size={24} icon={threedot} />
            </SidebarToggle>
            )}
            <NavbarBrandStyled href="/dashboard">
              {'LOGO'}
            </NavbarBrandStyled>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret color="white">
                    <span style={{ color: 'white', fontSize: '1rem' }}>Language</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => onChangeLanguage('tr')}>Türkçe</DropdownItem>
                    <DropdownItem onClick={() => onChangeLanguage('en')}>English</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                {isLogged && <Logged logOut={this.onClick} />}
                {!isLogged && <Anonim />}
              </Nav>
            </Collapse>
          </ContainerStyled>
        </NavbarStyled>
      </>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    generalActions: bindActionCreators(generalActions, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
