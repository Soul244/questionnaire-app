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


const CardContainer = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
`;

const CardStyled = styled(Card)`
  text-align: center;
  ${CardContainer}:hover & {
    opacity:0.2;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;

const OverlayContainer = styled.div`
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right:0;
  transition: .5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: 2;
  margin: 5px 0;
  ${CardContainer}:hover & {
    opacity:1;
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
    <Masonry
      className="masonry-card-list"
      options={masonryOptions}
    >
      {polls.map(poll => (
        <Col md="4" key={poll._id}>
          <CardContainer>
            <CardStyled>
              <CardBody>
                <CardTitle>{poll.name}</CardTitle>
                <div dangerouslySetInnerHTML={{ __html: poll.desc }} />
              </CardBody>
              <CardFooter>
                <CardText>
                  <small className="text-muted">{moment(poll.createdAt).lang('tr').format('Do MMMM YYYY, H:mm')}</small>
                  <small> | </small>
                  <small className="text-muted">

                    Son güncelleme:
{' '}
                    {moment(poll.updatedAt).lang('tr').format('Do MMMM YYYY, H:mm')}
                  </small>
                </CardText>
              </CardFooter>
            </CardStyled>
            <OverlayContainer>
              <ButtonContainer>
                <Link
                  as={`/anket/${poll._id}`}
                  href={`/poll?_id=${poll._id}`}
                >
                  <a target="_blank">
                    <Button outline color="info">Anketi Çöz</Button>
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
