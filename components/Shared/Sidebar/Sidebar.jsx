import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import colors from '../../../css/colors';

const Container = styled.div` 
  height: 100%;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  z-index: 5;
  transition: transform 1s ease-out;
  transition: .5s cubic-bezier(.685,.0473,.346,1);
  transform:${props => (props.show ? 'translateZ(0)' : 'translate3d(-240px,0,0);')};
  ${({ show }) => show && `
    @media screen and (max-width: 992px){
      box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.2);
    }
  }
  `}
`;

const Nav = styled.ul`
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: start;
  transition: transform 1s ease-out;
  margin-top: ${props => (props.navMode === 'inside' ? '48px' : '')};
`;

const NavItem = styled.li` 
  padding: 12px 0 12px 24px;
  font-size: 16px;
  height:48px;
  background-color: ${props => (props.currentUrl === props.url ? colors.color3 : '')};
  color: ${props => (props.currentUrl === props.url ? 'white' : 'black')};
  transition: 0.2s;
  cursor: pointer;
  :hover{
    color: ${colors.color3} ;
    background-color: ${colors.color12}
  }
 `;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
    Router.events.on('routeChangeStart', this.handleRouteChange);
  }

  componentDidMount() {
    this.setState({
      url: Router.asPath,
    });
  }

  handleRouteChange = (url) => {
    this.setState({
      url,
    });
  };

  render() {
    const { url } = this.state;
    const { items, show, navMode } = this.props;
    return (
      <Container show={show}>
        <Nav navMode={navMode}>
          {items.map((item, index) => (
            <Link as={item.as} href={item.href} key={index}>
              <NavItem url={item.as} currentUrl={url}>
                {item.name}
              </NavItem>
            </Link>
          ))}
        </Nav>
      </Container>
    );
  }
}

export default Sidebar;
