import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import Icon, { plus } from '../../css/icons';

const CardContainer = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
`;

const CardStyled = styled(Card)`
  height: ${props => props.height};
  min-height: 150px;
  text-align: center;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const CardBodyStyled = styled(CardBody)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${CardContainer}:hover & {
    opacity: 0.2;
  }
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: 2;
  border-radius: 8px;
  ::after {
    content: "";
    background-image: ${(props) => {
    const { bg } = props;
    if (bg === 0) {
      return 'linear-gradient(120deg, #f6d365 0%, #fda085 100%);';
    } if (bg === 1) {
      return 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);';
    } if (bg === 2) {
      return 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);';
    } if (bg === 3) {
      return 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);';
    } if (bg === 4) {
      return 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%);';
    } if (bg === 5) {
      return 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)';
    } if (bg === 6) {
      return 'linear-gradient(to top, #d299c2 0%, #fef9d7 100%);';
    } if (bg === 7) {
      return 'linear-gradient(to top, #fddb92 0%, #d1fdff 100%);';
    } if (bg === 8) {
      return 'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);';
    }
    return 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);';
  }};
    opacity: 0.3;
    border-radius: 8px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 0.5rem;
`;

function MasonryList({ polls }) {
  const masonryOptions = {
    transitionDuration: 0,
  };
  return (
    <Masonry className="masonry-card-list" options={masonryOptions}>
      <Col md="4">
        <CardContainer>
          <CardStyled height="300px">
            <CardBodyStyled>
              <CardTitle>Yeni Anket Oluştur</CardTitle>
            </CardBodyStyled>
            <OverlayContainer bg={Math.floor(Math.random() * 10)}>
              <ButtonContainer>
                <Link
                  as="/dashboard/editor/yeni-anket"
                  href="/dashboard/editor"
                >
                  <Button>
                    <Icon size={64} icon={plus} />
                  </Button>
                </Link>
              </ButtonContainer>
            </OverlayContainer>
          </CardStyled>
        </CardContainer>
      </Col>
      {polls.map(poll => (
        <Col md="4" key={poll._id}>
          <CardContainer>
            <CardStyled>
              <CardBodyStyled>
                <CardTitle>{poll.name}</CardTitle>
                <div dangerouslySetInnerHTML={{ __html: poll.desc }} />
              </CardBodyStyled>
              <CardFooter>
                <CardText>
                  <small className="text-muted">
                    {'oluşturulma tarihi: '}
                    {moment(poll.createdAt)
                      .lang('tr')
                      .format('Do MMMM YYYY, H:mm')}
                  </small>
                </CardText>
              </CardFooter>
            </CardStyled>
            <OverlayContainer bg={Math.floor(Math.random() * 10)}>
              <ButtonContainer>
                <Link as={`/anket/${poll._id}`} href={`/poll?_id=${poll._id}`}>
                  <a target="_blank">
                    <Button>Ankete Git</Button>
                  </a>
                </Link>
              </ButtonContainer>
            </OverlayContainer>
          </CardContainer>
        </Col>
      ))}
    </Masonry>
  );
}

MasonryList.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default MasonryList;
