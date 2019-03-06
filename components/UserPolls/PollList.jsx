import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
} from 'reactstrap';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import Icon, {
  remove2, edit, stats, iframe, showPoll,
} from '../../css/icons';

import Iframe from './Iframe';

const ButtonList = styled.div`
  display:flex;
  flex-direction:row;
  @media (max-width: 992px) {
    flex-direction:column;
    }
`;

const ButtonStyled = styled(Button)`
  margin: 0 4px;
  width: 50px;
  @media (max-width: 992px) {
    margin: 4px 0;
    }
`;

const TableStyled = styled(Table)` 
  background-color: #fff;
`;

class PollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showDelete: false,
    };
  }

  notify = (message) => {
    /*
        if (message) {
      toast.info(message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    */
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  toggleDelete = () => {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete,
    }));
  }

  removePoll = (id) => {
    this.props.deletePoll(id);
    this.toggleDelete();
  }

  render() {
    const { polls, message } = this.props;
    return (
      <>
        {this.notify(message)}
        <ToastContainer autoClose={2000} />
        <TableStyled bordered hover responsive>
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
                    <ButtonList>
                      <Link as={`/anket/${item.slug}`} href={`/poll?slug=${item.slug}`}>
                        <a target="_blank">
                          <ButtonStyled outline color="success" id={`embed${item._id}`}>
                            <Icon size="24px" icon={showPoll} />
                          </ButtonStyled>
                        </a>
                      </Link>
                      <Link as={`/anket/editor/${item.slug}`} href={`/poll/editor?slug=${item.slug}`}>
                        <ButtonStyled outline color="info" id={`update${item._id}`}>
                          <Icon size="24px" icon={edit} />
                        </ButtonStyled>
                      </Link>
                      <ButtonStyled outline color="danger" onClick={this.toggleDelete} id={`delete${item._id}`}>
                        <Icon size="24px" icon={remove2} />
                      </ButtonStyled>
                      <Modal isOpen={this.state.showDelete} toggle={this.toggleDelete}>
                        <ModalHeader toggle={this.toggleDelete}>Uyarı</ModalHeader>
                        <ModalBody>Anketi silmek istediğinize emin misiniz?</ModalBody>
                        <ModalFooter>
                          <Button color="danger" onClick={() => this.removePoll(item._id)}>Sil</Button>
                          {' '}
                          <Button color="secondary" onClick={this.toggleDelete}>Hayır</Button>
                        </ModalFooter>
                      </Modal>
                      <Link as={`/anket/istatistikler/${item.slug}`} href={`/poll/stats?slug=${item.slug}`}>
                        <ButtonStyled outline color="secondary" id={`stats${item._id}`}>
                          <Icon size="24px" icon={stats} />
                        </ButtonStyled>
                      </Link>
                      <ButtonStyled outline color="secondary" onClick={this.toggle} id={`iframe${item._id}`}>
                        <Icon size="24px" icon={iframe} />
                      </ButtonStyled>
                      <Iframe modal={this.state.modal} pollName={item.slug} toggle={this.toggle} />
                    </ButtonList>
                    <UncontrolledTooltip placement="bottom" target={`embed${item._id}`}>Ankete git</UncontrolledTooltip>
                    <UncontrolledTooltip placement="bottom" target={`delete${item._id}`}>Sil</UncontrolledTooltip>
                    <UncontrolledTooltip placement="bottom" target={`update${item._id}`}>Güncelle</UncontrolledTooltip>
                    <UncontrolledTooltip placement="bottom" target={`stats${item._id}`}>İstatistikler</UncontrolledTooltip>
                    <UncontrolledTooltip placement="bottom" target={`iframe${item._id}`}>IFrame kodunu al</UncontrolledTooltip>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TableStyled>
      </>
    );
  }
}

PollList.propTypes = {
  deletePoll: PropTypes.func.isRequired,
  polls: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
};

export default PollList;
