import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  CardFooter,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

import Parser from 'html-react-parser';
import { Paginate, Loading } from '../../components/Shared';

import * as pollsActions from '../../redux/actions/pollsActions';

const CardContainer = styled.div`
  position: relative;
  margin: 0.5rem;
`;

const CardStyled = styled(Card)`
  max-width: 326px;
  ${CardContainer}:hover & {
    opacity:0.2;
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

class index extends Component {
  constructor() {
    super();
    this.state = {
      page: 0
    };
  }

  // load first page
  componentWillMount() {
    this.props.getAllPolls(0);
  }

  handlePageChange = page => {
    this.setState({
      page
    });
    this.props.getAllPolls(this.state.page);
  };

  render() {
    const { allPolls, fetching, fetched, count } = this.props.polls;
    const { page } = this.state;
    const masonryOptions = {
      transitionDuration: 0
    };
    if (fetching && !fetched) {
      return <Loading />;
    }
    return (
      <Container>
        <Row>
          <Col md="12">
            <Masonry
              className={'masonry-card-list'}
              options={masonryOptions} // default {}
            >
              {allPolls.map(poll => (
                <CardContainer key={poll._id}>
                  <CardStyled>
                    <CardHeaderStyled>
                      <div className="svg-icon">
                        <img
                          src="https://image.flaticon.com/icons/svg/527/527489.svg"
                          alt=""
                        />
                      </div>
                      <FlexItem>{poll.user.email}</FlexItem>
                    </CardHeaderStyled>
                    <CardBody>
                      <CardTitle>{poll.name}</CardTitle>
                      <div>{Parser(poll.desc)}</div>
                    </CardBody>
                    <CardFooter>
                      <CardText>
                        <small className="text-muted">{poll.createdAt}</small>
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
                              <Button color="info">Anketi Çöz</Button>
                            </a>
                          </Link>
                      </ButtonContainer>
                  </OverlayContainer>
                </CardContainer>
              ))}
            </Masonry>
            <Paginate
              itemsCount={count}
              handlePageChange={this.handlePageChange}
              page={page}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  polls: state.polls
});

export default connect(
  mapStateToProps,
  pollsActions
)(index);
