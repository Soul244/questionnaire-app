/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Swiper from 'react-id-swiper';
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
import withJustNavbar from '../../hoc/withJustNavbar';

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
  padding: ${props => (props.pd ? '16rem 0' : '8rem 0')};
  position:relative;
  ::before{
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    background-color: rgba(${props => (props.image ? '23, 162, 184,0.1' : '')});
  }
  h1,
  h2 {
    color: #17a2b8;
  }
  p{
    color: ${props => (props.image ? 'white' : 'black')};
  }
`;

const List = styled.ul`
  text-align: center;
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
  width: 100%;
  text-align: center;
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

const CardStyled = styled(Card)`
    width: 400px;
    margin: 1rem 0 2rem 0;
    border:none;
`;

const Title = styled.h2` 
  margin-bottom:2rem;
`;

@withJustNavbar
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarShow: true,
    };
  }

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
          Router.push({ pathname: '/dashboard/anketlerim' });
        }
      })
      .catch(() => {
        localStorage.setItem('token', '');
      });
  }

  render() {
    const params = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    };

    return (
      <Container fluid style={{ padding: 0 }}>
        <ContainerBackground pd id="anasayfa" image="/static/image_1.jpg">
          <Container>
            <Row>
              <Col md="12">
                <h1>Ücretsiz anketlerinizi oluşturun ve paylaşın.</h1>
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
            </Row>
          </Container>
          <IconContainer>
            <Icon
              size="48px"
              icon={arrowDown}
            />
          </IconContainer>
        </ContainerBackground>
        <ContainerBackground id="ornekler">
          <Container>
            <Row>
              <Col md="12">
                <Title>Örnek Anketler</Title>
              </Col>
              <Col md="12">
                <Swiper {...params}>
                  <CardStyled>
                    <CardImg
                      top
                      width="100%"
                      src="/static/image_4.jpg"
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
                  </CardStyled>
                  <CardStyled>
                    <CardImg
                      top
                      width="100%"
                      src="/static/image_5.jpg"
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
                  </CardStyled>
                  <CardStyled>
                    <CardImg
                      top
                      width="100%"
                      src="/static/image_6.jpg"
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
                  </CardStyled>
                </Swiper>
              </Col>
            </Row>
          </Container>
        </ContainerBackground>
        <ContainerBackground bg id="mobil">
          <Container>
            <Row>
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
            </Row>
          </Container>
        </ContainerBackground>
        <ContainerBackground id="istatistikler">
          <Container>
            <Row>
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
            </Row>
          </Container>
        </ContainerBackground>
      </Container>
    );
  }
}

export default index;
