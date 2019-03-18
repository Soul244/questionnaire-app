/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Swiper from 'react-id-swiper';
import { Parallax } from 'react-parallax';
import styled, { keyframes } from 'styled-components';
import { Bounce, Zoom, Fade } from 'react-reveal';

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

import axios from '../../redux/axios';
import Icon, { arrowDown, phone, mail } from '../../css/icons';
import withJustNavbar from '../../hoc/withJustNavbar';

const ContainerBackground = styled.div`
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
  height: ${props => props.height};
  background-image: url(${props => props.image});
  background-color: #fff;
  padding: ${props => (props.pd ? '10rem 0' : '8rem 0')};
  position:relative;
  ${({ bg }) => bg
    && `
    background-color: #F8F8F8;
    border-bottom: 1px solid lightgrey;
  `}
  ${({ px }) => px
    && `
    background-color: transparent;
    color: white;
    ::before{
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    background-color: rgba(0, 0, 0, 0.7);
  }
  `}
  ${({ image }) => image
    && `
    ::before{
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    background-color: rgba(0, 0, 0,0.2);
  }
  `}
  p{
    color: ${props => (props.image ? 'white' : 'black')};
  }
`;

const H1 = styled.h1`
  color: ${props => (props.light ? 'white' : '#17a2b8')};
  font-weight: 600;
  margin: 2rem 0;
`;

const H2 = styled.h2`
  color: ${props => (props.light ? 'white' : '#17a2b8')};
  font-weight: 600;
  margin: 2rem 0;
`;

const List = styled.ul`
  text-align: center;
  list-style-type: none;
  font-size: 1.4rem;
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
  z-index: 1;
  position:relative;
`;

const Span = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index:0;
  border-radius: ${(props) => {
    switch (props.bg) {
      case 0:
        return '74% 26% 61% 39% / 22% 81% 19% 78% ';
      case 1:
        return '30% 70% 80% 20% / 13% 9% 91% 87%';
      case 2:
        return '34% 66% 73% 27% / 57% 67% 33% 43% ';
      default:
        return '100% 0% 73% 27% / 57% 67% 33% 43% ';
    }
  }}
   
   ;
  background-image: ${(props) => {
    switch (props.bg) {
      case 0:
        return 'linear-gradient(120deg, #f6d365 0%, #fda085 100%);';
      case 1:
        return 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);';
      case 2:
        return 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);';
      default:
        return 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);';
    }
  }};
`;

const CardImgStyled = styled.div`
  background-image: url(${props => props.src});
  width: 100%;
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  :before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 65px;
    background: url(${props => (props.wave2 ? '/static/wave_2.webp' : '/static/wave.webp')});
    background-size: cover;
  }
`;

const CardStyled = styled(Card)`
  width: 425px;
  height: 425px;
  margin: 1rem 0 2rem 0;
  border: none;
  @media (max-width: 576px) {
    height: 500px;
    width: 300px;
  }
`;

const CardBodyStyled = styled(CardBody)`
  padding-top: 2rem;
`;

const Footer = styled.div`
  background-color: lightgrey;
  color: #17a2b8;
  font-size: 1rem;
  padding: 1rem 0;
  @media (max-width: 576px) {
    font-size: 0.85rem;
  }
  p {
    display: inline-block;
    margin-left: 1rem;
  }
`;

const LinkStyled = styled.a`
  color: #17a2b8;
  :hover {
    text-decoration: none;
    color: #00899f;
  }
`;

const FooterIconContainer = styled.div`
  margin-left: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  p {
    margin-bottom: 0;
  }
  @media (max-width: 576px) {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

@withJustNavbar
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        activeSlideKey: '2',
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
      },
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
          Router.push({ pathname: '/dashboard' });
        }
      })
      .catch(() => {
        localStorage.setItem('token', '');
      });
  }

  render() {
    const { params } = this.state;
    return (
      <>
        <Container fluid style={{ padding: 0 }}>
          <ContainerBackground bg pd id="anasayfa">
            <Container>
              <Row>
                <Col md="6">
                  <Fade top>
                    <H1>Ücretsiz anketlerinizi oluşturun ve paylaşın.</H1>
                    <H2>Tamamen ücretsiz!</H2>
                  </Fade>
                  <Link as="/giris-yap" href="/auth">
                    <Button type="button" color="info">
                      {' Ücretsiz hesap'}
                    </Button>
                  </Link>
                  {' '}
                  <Link as="/giris-yap" href="/auth">
                    <Button type="button" color="success">
                      {'Giriş yapın'}
                    </Button>
                  </Link>
                </Col>
                <Col md="6">
                  <Bounce right>
                    <Image
                      className="img-fluid"
                      src="static/svg_1.svg"
                      alt="ücretsiz anket"
                    />
                  </Bounce>
                  <Span bg={0} />
                </Col>
              </Row>
            </Container>
            <IconContainer>
              <Icon size="48px" icon={arrowDown} />
            </IconContainer>
          </ContainerBackground>
          <ContainerBackground id="ornekler">
            <Container>
              <Row>
                <Col md="12" className="text-center">
                  <H2>Örnek Anketler</H2>
                  <Swiper {...params}>
                    <CardStyled key={1}>
                      <LinkStyled href="https://questionnaire-test.herokuapp.com/anket/5c8514b3f8f6450017ebbd1e">
                        <CardImgStyled src="/static/image_4.webp" />
                        <CardBodyStyled>
                          <CardTitle>Maçın Favorisi Kim?</CardTitle>
                          <CardSubtitle>
                            {'Lig maçının favorisini seçin.'}
                          </CardSubtitle>
                          <CardText>
                            {
                              'Fenerbahçe ile Beşiktaş arasında oynanacak dev derbiyi kim kazanacak? Ankete katıl ve büyük ödülü kazanma şansı yakala.'
                            }
                          </CardText>
                        </CardBodyStyled>
                      </LinkStyled>
                    </CardStyled>
                    <CardStyled key={2}>
                      <LinkStyled href="https://questionnaire-test.herokuapp.com/anket/5c8515b9f8f6450017ebbd27">
                        <CardImgStyled wave2 src="/static/image_5.webp" />
                        <CardBodyStyled>
                          <CardTitle>En İyi Araba Lastiği Hangisi?</CardTitle>
                          <CardSubtitle>
                            {'Sizin için en iyi araba lastiğini seçin.'}
                          </CardSubtitle>
                          <CardText>
                            {
                              ' Ankete katılın ve ücretsiz araba lastiği kazanma şansı yakalayın!'
                            }
                          </CardText>
                        </CardBodyStyled>
                      </LinkStyled>
                    </CardStyled>
                    <CardStyled key={3}>
                      <LinkStyled
                        href="https://questionnaire-test.herokuapp.com/anket/5c851678f8f6450017ebbd2e"
                        target="_blank"
                      >
                        <CardImgStyled src="/static/image_6.webp" />
                        <CardBodyStyled>
                          <CardTitle>
                            {'Yerel Seçimlerde Kime Oy Vereceksiniz?'}
                          </CardTitle>
                          <CardSubtitle>
                            {'Hangi partiye oy vermeyi planlıyorsunuz?'}
                          </CardSubtitle>
                          <CardText>
                            {
                              "Türkiye'nin kaderini etkileyecek olacak olan bu seçimlerde, kendi bölgenizde hangi adaya oy vereceksiniz?"
                            }
                          </CardText>
                        </CardBodyStyled>
                      </LinkStyled>
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
                  <Bounce left>
                    <TextContainer>
                      <H2>Mobil</H2>
                      <List>
                        <li>Anketleriniz mobile uygun!</li>
                        <li>Kolayca sitenize entegre edin.</li>
                        <li>Tasarım basit ve kolay!</li>
                      </List>
                    </TextContainer>
                  </Bounce>
                </Col>
                <Col md="6">
                  <Bounce right>
                    <Image
                      className="img-fluid"
                      src="/static/svg_2.svg"
                      alt="mobile uygun"
                    />
                  </Bounce>
                  <Span bg={1} />
                </Col>
              </Row>
            </Container>
          </ContainerBackground>
          <Parallax bgImage="/static/image_3.webp" strength={200}>
            <ContainerBackground px>
              <Container>
                <Row>
                  <Col md="12">
                    <Zoom top>
                      <TextContainer>
                        <H1 light>Markanıza Özel Anket</H1>
                        <List>
                          <li>Markanıza özel anket tasarımı</li>
                          <li>Kolay uygulanabilir ve tasarlanabilir.</li>
                          <li>Alternatifi bol!</li>
                        </List>
                      </TextContainer>
                    </Zoom>
                  </Col>
                </Row>
              </Container>
            </ContainerBackground>
          </Parallax>
          <ContainerBackground id="istatistikler">
            <Container>
              <Row>
                <Col md="6" className="text-center">
                  <Fade top>
                    <Image className="img-fluid" src="/static/svg_3.svg" alt="istatistikler" />
                  </Fade>
                  <Span bg={2} />
                </Col>
                <Col md="6">
                  <Fade top>
                    <TextContainer>
                      <H2>İstatistik</H2>
                      <List>
                        <li>Anketlerinize kaç kişi katıldı?</li>
                        <li>Kaç kişi, hangi şıkka oy verdi?</li>
                        <li>Kolayca takip edin.</li>
                      </List>
                    </TextContainer>
                  </Fade>
                </Col>
              </Row>
            </Container>
          </ContainerBackground>
          <Footer>
            <Container>
              <Row>
                <Col className="text-center">
                  <FooterIconContainer>
                    <Icon size="48px" icon={phone} />
                    <p>0538 086 79 69</p>
                  </FooterIconContainer>
                  <FooterIconContainer>
                    <Icon size="48px" icon={mail} />
                    <p>hasancangedik@hotmail.com</p>
                  </FooterIconContainer>
                </Col>
              </Row>
            </Container>
          </Footer>
        </Container>
      </>
    );
  }
}

export default index;
