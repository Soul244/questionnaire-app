/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import Parallax from 'react-springy-parallax';
import styled, { keyframes } from 'styled-components';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

import axios from '../../redux/axios';
import Icon, { arrowDown } from '../../css/icons';

const RowStyled = styled(Row)`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ContainerBackground = styled.div`
  background-image: url(${props => props.image});
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
  height: ${props => props.height};
  background-color: ${props => (props.bg ? '#F8F8F8' : '#fff')};
  padding: 8rem 0;
  position:relative;
  ::before{
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    background-color: rgba(${props => (props.image ? '0, 0, 0,0.1' : '')});
  }
  h1,
  h2 {
    color: #17a2b8;
  }
  p{
    color: black;
  }
`;

const List = styled.ul`
  text-align: center;
`;

const Title = styled.h1`
position: relative;
margin-bottom:16px;
  ::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 8px;
    left:0;
    bottom: 0;
    border-bottom: 1px solid #17a2b8;
  }
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
  svg {
    fill: white;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
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
    axios
      .post('/users/token', {
        token: localStorage.getItem('token'),
      })
      .then((response) => {
        const { isTokenValid } = response.data;
        if (!isTokenValid) {
          localStorage.setItem('token', '');
        } else {
          Router.push({ pathname: '/anket/anketlerim' });
        }
      })
      .catch(() => {
        localStorage.setItem('token', '');
      });
  }

  render() {
    return (
      <Container fluid style={{ padding: 0 }}>
        <ContainerBackground image="/static/image_3.jpg">
          <Container>
            <RowStyled>
              <Col>
                <Title>Ücretsiz anketlerinizi oluşturun ve paylaşın.</Title>
                <p>
                  Anketlerinizi oluşturun, paylaşın ve istatistiklerinizi görün.
                  Tamamen ücretsiz!
                </p>
                <Link as="/giris-yap" href="/auth">
                  <Button type="button" color="info">
                    Ücretsiz hesap
                  </Button>
                </Link>
                {' '}
                <Link as="/giris-yap" href="/auth">
                  <Button type="button" color="secondary">
                    Giriş yapın
                  </Button>
                </Link>
              </Col>
              <IconContainer>
                <Icon
                  size="48px"
                  icon={arrowDown}
                />
              </IconContainer>
            </RowStyled>
          </Container>
        </ContainerBackground>
        <ContainerBackground>
          <Container>
            <RowStyled>
              <Col md="12">
                <h2>Örnek Anketler</h2>
              </Col>
              <Col md="4">
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src="/static/image_4.jpeg"
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle>Maçın Favorisi Kim?</CardTitle>
                    <CardSubtitle>Lig maçının favorisini seçin.</CardSubtitle>
                    <CardText>
                      Fenerbahçe ile Beşiktaş arasında oynanacak dev derbiyi kim
                      kazanacak? Ankete katıl ve çekilişe katıl.
                    </CardText>
                    <Button outline>Ankete Git</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src="/static/image_5.jpeg"
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle>En İyi Araba Lastiği Hangisi?</CardTitle>
                    <CardSubtitle>
                      Sizin için en iyi araba lastiğini seçin.
                    </CardSubtitle>
                    <CardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText>
                    <Button outline>Ankete Git</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src="/static/image_6.jpeg"
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle>
                      Yerel Seçimlerde Kime Oy Vereceksiniz?
                    </CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText>
                    <Button outline>Ankete Git</Button>
                  </CardBody>
                </Card>
              </Col>
            </RowStyled>
          </Container>
        </ContainerBackground>
        <ContainerBackground bg>
          <Container>
            <RowStyled>
              <Col md="6">
                <TextContainer>
                  <h2>Mobil</h2>
                  <List>
                    <li>Aliqua anim tempor esse laboris velit.</li>
                    <li>Est Lorem cillum tempor ut enim ipsum.</li>
                    <li>Minim esse commodo sint ullamco ullamco nostrud est cillum labore id quis laboris occaecat.</li>
                  </List>
                </TextContainer>
              </Col>
              <Col md="6" className="text-center">
                <Image src="/static/phone.png" height="500px" alt="" />
              </Col>
            </RowStyled>
          </Container>
        </ContainerBackground>
        <ContainerBackground>
          <Container>
            <RowStyled>
              <Col md="6" className="text-center">
                <Image src="/static/image_2.png" height="300px" alt="" />
              </Col>
              <Col md="6">
                <TextContainer>
                  <h2>İstatistik</h2>
                  <ul>
                    <li>Aliqua anim tempor esse laboris velit.</li>
                    <li>Est Lorem cillum tempor ut enim ipsum.</li>
                    <li>Minim esse commodo sint ullamco ullamco nostrud est cillum labore id quis laboris occaecat.</li>
                  </ul>
                </TextContainer>
              </Col>
            </RowStyled>
          </Container>
        </ContainerBackground>
      </Container>
    );
  }
}

export default index;
