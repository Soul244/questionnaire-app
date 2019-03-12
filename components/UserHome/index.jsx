import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {
  Table,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  CardFooter,
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import Masonry from 'react-masonry-component';

import Actions from './Actions';

const TableStyled = styled(Table)` 
  background-color: #fff;
`;

const CardContainer = styled.div`
  position: relative;
  margin: 0.5rem;
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

const CardHeaderStyled = styled(CardHeader)`
  display: flex;
  align-items: center;
`;

const FlexItem = styled.div`
  margin-left: 0.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 0.5rem;
`;


class index extends React.Component {
  notify = (message) => {
    /*
        if (message) {
      toast.info(message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    */
  };


  render() {
    const masonryOptions = {
      transitionDuration: 0,
    };
    const { polls, message, deletePoll } = this.props;
    return (
      <>
        {this.notify(message)}
        <ToastContainer autoClose={2000} />
        <Masonry
          className="masonry-card-list"
          options={masonryOptions}
        >
          {polls.map(poll => (
            <Col md="4">
              <CardContainer key={poll._id}>
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
                        {moment(poll.updadetAt).lang('tr').format('Do MMMM YYYY, H:mm')}
                      </small>
                    </CardText>
                  </CardFooter>
                </CardStyled>
                <OverlayContainer>
                  <ButtonContainer>
                    <Link
                      as={`/anket/${poll.slug}`}
                      href={`/poll?slug=${poll.slug}`}
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
        <Card>
          <TableStyled hover responsive>
            <thead>
              <tr>
                <th>Anket Başlığı</th>
                <th>Anket Adresi</th>
                <th>Tarih</th>
                <th>Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {polls && polls.length > 0 && (
                polls.map(item => (
                  <tr key={item._id}>
                    <td dangerouslySetInnerHTML={{ __html: item.name }} />
                    <td>{item.slug}</td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td>
                      <Actions _id={item._id} slug={item.slug} deletePoll={deletePoll} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </TableStyled>
        </Card>
      </>
    );
  }
}

index.propTypes = {
  deletePoll: PropTypes.func.isRequired,
  polls: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
};

export default index;
