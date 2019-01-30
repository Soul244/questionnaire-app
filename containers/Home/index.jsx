import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import {
  Card, CardBody, CardTitle, CardText, Button, Container, Row, Col,
} from 'reactstrap';

import { Paginate, Loading } from '../../components/Shared';

import * as pollsActions from '../../redux/actions/pollsActions';

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
                <CardBody>
                  <CardTitle>{poll.slug}</CardTitle>
                  <CardText>{poll.desc}</CardText>
                  <Link as={`/anket/${poll.slug}`} href={`/poll?slug=${poll.slug}`}>
                    <a target="_blank">
                      <Button>Anketi Çöz</Button>
                    </a>
                  </Link>
                  <CardText>
                    <small className="text-muted">{poll.createdAt}</small>
                  </CardText>
                  <a />
                </CardBody>
              </Card>
            ))}
            <Paginate pageCount={count / 10} handlePageChange={this.handlePageChange} />
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
