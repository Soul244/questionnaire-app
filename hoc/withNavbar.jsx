import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { Navbar, Sidebar } from '../components/Shared';

const FullContainer = styled.div`
  @media(max-width:992px){
    transform: ${props => (props.show ? 'translate3d(240px, 0, 0)' : '')};
  }
`;

function withNavbar(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        navMode: 'inside',
        items: [
          { href: '/dashboard', name: 'Dashboard', as: '/dashboard' },
          { href: '/test', name: 'Test 1', as: '/test1' },
          { href: '/test', name: 'Test 2', as: '/test2' },
        ],
      };
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
      if (window.innerWidth <= 1592) {
        this.setState({
          show: false,
        });
      } else {
        this.setState({
          show: true,
        });
      }
      if (window.innerWidth <= 992) {
        this.setState({
          navMode: 'outside',
        });
      } else {
        this.setState({
          navMode: 'inside',
        });
      }
    };

    sideBarToggle = () => {
      this.setState(prevState => ({
        show: !prevState.show,
      }));
    };

    render() {
      const { show, navMode, items } = this.state;
      return (
        <>
          <Sidebar
            items={items}
            show={show}
            navMode={navMode}
          />
          <FullContainer show={show}>
            <Navbar sideBarToggle={this.sideBarToggle} sideBarShow={show} />
            <Container className="h-100 mt-2">
              <WrappedComponent {...this.props} />
            </Container>
          </FullContainer>
        </>
      );
    }
  };
}

export default withNavbar;
