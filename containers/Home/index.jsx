import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import {
  Card, CardBody, CardTitle, CardText, CardHeader, CardFooter, Button, Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';

import Parser from 'html-react-parser';
import { Paginate, Loading } from '../../components/Shared';

import * as pollsActions from '../../redux/actions/pollsActions';

const CardHeaderStyled = styled(CardHeader)` 
  display:flex;
  align-items: center;
`;

const FlexItem = styled.div` 
  margin-left: 0.5rem;
`;

const ButtonContainer = styled.div` 
  margin-top:0.5rem;
`;

class index extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    this.props.getAllPolls(0);
  }

  handlePageChange(page) {
    this.setState({
      page,
    });
    this.props.getAllPolls(this.state.page);
  }

  render() {
    const {
      allPolls, fetching, fetched, count,
    } = this.props.polls;
    const { page } = this.state;
    if (fetching && !fetched) {
      return (
        <Loading />
      );
    }
    return (
      <Container>
        <Row>
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle>TİTLE</CardTitle>
                <CardText>Text</CardText>
                <CardText>
                  <small className="text-muted">asd</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            {allPolls.map(poll => (
              <Card key={poll._id}>
                <CardHeaderStyled>
                  <div className="svg-icon">
                    <img src="https://image.flaticon.com/icons/svg/527/527489.svg" alt="" />
                  </div>
                  <FlexItem>
                    {poll.user.email}
                  </FlexItem>
                </CardHeaderStyled>
                <CardBody>
                  <CardTitle>{poll.name}</CardTitle>
                  <CardText>{Parser(poll.desc)}</CardText>
                  <ButtonContainer>
                    <Link as={`/anket/${poll.slug}`} href={`/poll?slug=${poll.slug}`}>
                      <a target="_blank">
                        <Button color="info">Anketi Çöz</Button>
                      </a>
                    </Link>
                  </ButtonContainer>
                </CardBody>
                <CardFooter>
                  <CardText>
                    <small className="text-muted">{poll.createdAt}</small>
                  </CardText>
                </CardFooter>
              </Card>
            ))}
            <Paginate itemsCount={count} handlePageChange={this.handlePageChange} page={page} />
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle>TİTLE</CardTitle>
                <CardText>Text</CardText>
                <CardText>
                  <small className="text-muted">asd</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  polls: state.polls,
});

export default connect(
  mapStateToProps,
  pollsActions,
)(index);
