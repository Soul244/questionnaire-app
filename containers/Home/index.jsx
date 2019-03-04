/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import Parallax from 'react-springy-parallax';
import styled, { keyframes } from 'styled-components';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import Typed from 'react-typed';

import axios from '../../redux/axios';
import Icon, {
  arrowDown,
} from '../../css/icons';

const ContainerStyled = styled(Container)`
  height: 100%;
`;

const RowStyled = styled(Row)`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ContainerBackground = styled.div`
  background-image: url(${props => props.image});
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.bg ? '#F0F0F0' : '#fff')};
`;

const HeaderContainer = styled.div`
  background: linear-gradient(to bottom,rgba(10,10,10,0.7) 75%,transparent);
  border-radius: 50px;
  padding: 1rem 2rem;
  text-align: center;
`;

const Header = styled.h1`
  color: white;
`;

const Text = styled.p`
  color: white;
`;

const iconAnimation = keyframes`
  0%   {opacity: 0.5; bottom: 40px;}
  50% {opacity: 1;bottom:20px;}
  75% {opacity: 1;bottom:20px;}
  100% {opacity: 1;bottom:20px;}
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 20px;
  animation: ${iconAnimation} 2s linear infinite;
  svg{
    fill: white;
  }
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  button{
    margin-top: 2rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align:center;
`;

const Image = styled.img`
    height: ${props => props.height};
    width: auto;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 100%;
  background-color: black;
  position: absolute;
  bottom: 0;
`;

class index extends Component {
  componentDidMount() {
    axios.post('/users/token', {
      token: localStorage.getItem('token'),
    })
      .then((response) => {
        const { isTokenValid } = response.data;
        if (!isTokenValid) {
          Router.push({ pathname: '/anasayfa' });
          localStorage.setItem('token', '');
        } else {
          Router.push({ pathname: '/anket/anketlerim' });
        }
      })
      .catch(() => {
        Router.push({ pathname: '/anasayfa' });
        localStorage.setItem('token', '');
      });
  }

  render() {
    return (
      <Container fluid style={{ padding: 0 }}>
        <Parallax ref="parallax" pages={4}>
          <Parallax.Layer
            offset={0}
            speed={0}
          >
            <ContainerBackground image="/static/image_1.jpeg">
              <ContainerStyled>
                <RowStyled>
                  <Col>
                    <HeaderContainer>
                      <Header>Ücretsiz anketlerinizi oluşturun ve paylaşın.</Header>
                      <Text>
                      Anketlerinizi oluşturun, paylaşın ve istatistiklerinizi görün. Tamamen ücretsiz!
                      </Text>
                      <Link as="/giris-yap" href="/auth">
                        <Button type="button" color="info">
                        Ücretsiz hesap
                        </Button>
                      </Link>
                    </HeaderContainer>
                  </Col>
                  <IconContainer>
                    <Icon size="48px" icon={arrowDown} onClick={() => this.refs.parallax.scrollTo(1)} />
                  </IconContainer>
                </RowStyled>
              </ContainerStyled>
            </ContainerBackground>
          </Parallax.Layer>
          <Parallax.Layer
            offset={1}
            speed={0}
            onClick={() => this.refs.parallax.scrollTo(2)}
          >
            <ContainerBackground>
              <ContainerStyled>
                <RowStyled>
                  <Col md="6">
                    <TextContainer>
                      <h2>Mobil</h2>
                      <Typed
                        strings={['Basit ve mobil için uyumlu.']}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                      />
                    </TextContainer>
                  </Col>
                  <Col md="6">
                    <Image src="/static/phone.png" height="700px" alt="" />
                  </Col>
                </RowStyled>
              </ContainerStyled>
            </ContainerBackground>
          </Parallax.Layer>
          <Parallax.Layer
            offset={2}
            speed={0}
            onClick={() => this.refs.parallax.scrollTo(0)}
          >
            <ContainerBackground bg>
              <ContainerStyled>
                <RowStyled>
                  <Col md="6">
                    <Image src="/static/image_2.png" height="400px" alt="" />
                  </Col>
                  <Col md="6">
                    <TextContainer>
                      <h2>İstatistik</h2>
                      <Typed
                        strings={['Detaylı istatistiklerini görün ve dışarı aktarın.']}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                      />
                    </TextContainer>
                  </Col>
                </RowStyled>
              </ContainerStyled>
            </ContainerBackground>
          </Parallax.Layer>
          <Parallax.Layer
            offset={3}
            speed={0}
            onClick={() => this.refs.parallax.scrollTo(0)}
          >
            <ContainerBackground>
              <ContainerStyled>
                <RowStyled>
                  <Col md="6">
                    <TextContainer>
                      <h2>Örnekler</h2>
                      <p>Örnek testlere göz atın.</p>
                    </TextContainer>
                  </Col>
                  <Col md="6">
                    <ButtonList>
                      <Button color="secondary">Yerel Seçim</Button>
                      <Button color="secondary">Kim kazanır?</Button>
                      <Button color="secondary" type="button">Araba tercihleri</Button>
                    </ButtonList>
                  </Col>
                </RowStyled>
              </ContainerStyled>
            </ContainerBackground>
            <Footer>
              <a href="/about" as="/hakkimizda">Biz kimiz?</a>
            </Footer>
          </Parallax.Layer>
        </Parallax>
      </Container>

    );
  }
}

export default index;
