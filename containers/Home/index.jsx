/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Swiper from 'react-id-swiper';
import { Parallax } from 'react-parallax';
import styled, { keyframes } from 'styled-components';
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
  Nav,
  NavItem,
} from 'reactstrap';

import axios from '../../redux/axios';
import Icon, { arrowDown, phone, mail } from '../../css/icons';
import withJustNavbar from '../../hoc/withJustNavbar';
import Navbar from '../../components/Home/Navbar';

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
  padding: ${props => (props.pd ? '16rem 0' : '8rem 0')};
  position:relative;
  ${({ bg }) => bg && `
    background-color: #F8F8F8;
  `}
  ${({ px }) => px && `
    background-color: transparent;
    color: white;
    ::before{
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    background-color: rgba(0, 0, 0,0.5);
  }
  `}
  ${({ image }) => image && `
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
    color: #17a2b8;
    font-weight: 600;
    font-size: 3.4rem;
    margin-bottom: 2.4rem;
`;

const H2 = styled.h2`
    color: ${props => (props.light ? 'white' : '#17a2b8')};
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 3rem;
`;

const List = styled.ul`
  text-align: center;
  list-style-type: none;
  font-size: 1.8rem;
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

const CardImgStyled = styled.div` 
  background-image: url(${props => props.src});
  width: 100%;
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  :before{
    content:'';
    position:absolute;
    bottom:0;
    left:0;
    width: 100%;
    height: 65px;
    background: url(${props => (props.wave2 ? '/static/wave_2.png' : '/static/wave.png')});
    background-size: cover;
  }
`;

const CardStyled = styled(Card)`
    width: 400px;
    margin: 1rem 0 2rem 0;
    border:none;
`;

const Footer = styled.div` 
  background-color: black;
  color: #17a2b8;
  font-size: 1rem;
  padding: 1rem 0;
  display:flex;
`;

const NavStyled = styled(Nav)` 
  justify-content:center;
  align-items:center;
`;

const NavItemStyled = styled(NavItem)` 
  margin-right: 1rem;
  p{
    margin-left: 0.5rem;
    display: inline-block;
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
    this.setState(prevState => ({
      params: {
        ...prevState.params,
        activeSlideKey: '2',
      },
    }));
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
    const { params } = this.state;
    const secondNavItems = [
      {
        href: '#anasayfa',
        name: 'Anasayfa',
      },
      {
        href: '#ornekler',
        name: 'Örnekler',
      },
      {
        href: '#mobil',
        name: 'Mobil',
      },
      {
        href: '#istatistikler',
        name: 'istatistikler',
      },
    ];

    return (
      <>
        <Container fluid style={{ padding: 0 }}>
          <ContainerBackground pd id="anasayfa" image="/static/image_7.jpg">
            <Container>
              <Row>
                <Col md="12">
                  <H1>Ücretsiz anketlerinizi oluşturun ve paylaşın.</H1>
                  <p>
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
          <Navbar items={secondNavItems} />
          <ContainerBackground id="ornekler">
            <Container>
              <Row>
                <Col md="12">
                  <H2>Örnek Anketler</H2>
                </Col>
                <Col md="12">
                  <Swiper {...params}>
                    <CardStyled>
                      <CardImgStyled
                        src="/static/image_4.jpg"
                      />
                      <CardBody>
                        <CardTitle>Maçın Favorisi Kim?</CardTitle>
                        <CardSubtitle>Lig maçının favorisini seçin.</CardSubtitle>
                        <CardText>
                          Fenerbahçe ile Beşiktaş arasında oynanacak dev derbiyi kim
                          kazanacak? Ankete katıl ve büyük ödülü kazanma şansı yakala.
                        </CardText>
                        <Button outline>Ankete Git</Button>
                      </CardBody>
                    </CardStyled>
                    <CardStyled>
                      <CardImgStyled
                        wave2
                        src="/static/image_5.jpg"
                      />
                      <CardBody>
                        <CardTitle>En İyi Araba Lastiği Hangisi?</CardTitle>
                        <CardSubtitle>
                          Sizin için en iyi araba lastiğini seçin.
                        </CardSubtitle>
                        <CardText>
                        Ankete katılın ve ücretsiz araba lastiği kazanma şansı yakalayın!
                        </CardText>
                        <Button outline>Ankete Git</Button>
                      </CardBody>
                    </CardStyled>
                    <CardStyled>
                      <CardImgStyled
                        src="/static/image_6.jpg"
                      />
                      <CardBody>
                        <CardTitle>
                    Yerel Seçimlerde Kime Oy Vereceksiniz?
                        </CardTitle>
                        <CardSubtitle>Hangi partiye oy vermeyi planlıyorsunuz?</CardSubtitle>
                        <CardText>
                        Türkiye'nin kaderini etkileyecek olacak olan bu seçimlerde, kendi bölgenizde hangi adaya oy vereceksiniz?
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
                    <H2>Mobil</H2>
                    <List>
                      <li>Anketleriniz mobile uygun!</li>
                      <li>Kolayca sitenize entegre edin.</li>
                      <li>Tasarım basit ve kolay!</li>
                    </List>
                  </TextContainer>
                </Col>
                <Col md="6" className="text-center">
                  <Image src="/static/phone.png" height="500px" alt="" />
                </Col>
              </Row>
            </Container>
          </ContainerBackground>
          <Parallax
            blur={1}
            bgImage="/static/image_3.jpg"
            strength={200}
          >
            <ContainerBackground px>
              <Container>
                <Row>
                  <Col md="12">
                    <TextContainer>
                      <H2 light>Markanıza Özel Anket</H2>
                      <List>
                        <li>Markanıza özel anket tasarımı</li>
                        <li>Kolay uygulanabilir ve tasarlanabilir.</li>
                        <li>Alternatifi bol!</li>
                      </List>
                    </TextContainer>
                  </Col>
                </Row>
              </Container>
            </ContainerBackground>
          </Parallax>
          <ContainerBackground id="istatistikler">
            <Container>
              <Row>
                <Col md="6" className="text-center">
                  <Image src="/static/image_2.png" height="300px" alt="" />
                </Col>
                <Col md="6">
                  <TextContainer>
                    <H2>İstatistik</H2>
                    <List>
                      <li>Anketlerinize kaç kişi katıldı?</li>
                      <li>Kaç kişi, hangi şıkka oy verdi?</li>
                      <li>Kolayca takip edin.</li>
                    </List>
                  </TextContainer>
                </Col>
              </Row>
            </Container>
          </ContainerBackground>
          <Footer>
            <Container>
              <Row>
                <Col>
                  <NavStyled>
                    <NavItemStyled>
                      <Icon
                        size="48px"
                        icon={mail}
                      />
                      <p>hasancangedik@hotmail.com</p>
                    </NavItemStyled>
                    <NavItemStyled>
                      <Icon
                        size="48px"
                        icon={phone}
                      />
                      <p>0538 086 79 69</p>
                    </NavItemStyled>
                  </NavStyled>
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
