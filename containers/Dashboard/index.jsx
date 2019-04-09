import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';


import * as userActions from '../../redux/actions/userActions';
import * as pollActions from '../../redux/actions/pollActions';
import { TableList, MasonryList } from '../../components/Dashboard';
import { Loading, SectionHeader } from '../../components/Shared';
import withAuth from '../../hoc/withAuth';
import withNavbar from '../../hoc/withNavbar';
import Icon, { IconContainer, masonry, list } from '../../css/icons';

@withNavbar
@withAuth
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.setState({
      viewType: parseInt(localStorage.getItem('viewType'), 10) || 0,
    });
    const { pollActions } = this.props;
    if (!token && token === '') {
      Router.push({ pathname: '/giris-yap' });
    } else {
      const { getPolls } = pollActions;
      getPolls();
    }
  }

  onClick=(value) => {
    this.setState({
      viewType: value,
    });
    localStorage.setItem('viewType', value);
  }

  render() {
    const { pollReducer, pollActions } = this.props;
    const { viewType } = this.state;
    const {
      polls, message, fetching, fetched,
    } = pollReducer;
    const { deletePoll } = pollActions;
    if (fetching && !fetched) {
      return (
        <Loading />
      );
    }
    return (
      <>
        <Row>
          <Col md="12">
            <SectionHeader title="Anketlerim">
              <IconContainer color={viewType === 0 ? 'gray' : 'lightgray'} onClick={() => this.onClick(0)}>
                <Icon size={32} icon={masonry} />
              </IconContainer>
              <IconContainer color={viewType === 1 ? 'gray' : 'lightgray'} onClick={() => this.onClick(1)}>
                <Icon size={32} icon={list} />
              </IconContainer>
            </SectionHeader>
          </Col>
        </Row>
        {(viewType === 0) && (
          <Row>
            <Col md="12">
              <MasonryList polls={polls} />
            </Col>
          </Row>
        )}
        {viewType === 1 && (
        <Row>
          <Col md="12">
            <TableList
              polls={polls}
              message={message}
              deletePoll={deletePoll}
            />
          </Col>
        </Row>
        )}
      </>
    );
  }
}

Dashboard.propTypes = {
  pollReducer: PropTypes.shape({
    polls: PropTypes.array,
    message: PropTypes.string,
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  pollActions: PropTypes.shape({
    getPolls: PropTypes.func.isRequired,
    deletePoll: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
    pollReducer: state.pollReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    pollActions: bindActionCreators(pollActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
