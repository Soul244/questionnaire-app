import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import styled from 'styled-components';

import Icon, {
  remove2, edit, stats, iframe, showPoll,
} from '../../css/icons';
import Iframe from './Iframe';

const LinkText = styled.p`
    display:inline-block;
    margin:0 0 0 0.5rem;
    font-size: 16px;
`;

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dropdownOpen: false,
      showDelete: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  dropdownToggle= () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      showDelete: !prevState.showDelete,
    }));
  }

  onClick = (_id) => {
    const { deletePoll } = this.props;
    deletePoll(_id);
    this.toggleDeleteModal();
  }

  render() {
    const { _id, slug } = this.props;
    const {
      dropdownOpen, modal, showDelete,
    } = this.state;
    return (
      <>
        <ButtonDropdown direction="right" isOpen={dropdownOpen} toggle={this.dropdownToggle}>
          <DropdownToggle caret>
              Aksiyon
          </DropdownToggle>
          <DropdownMenu>
            <Link as={`/anket/${slug}`} href={`/poll?slug=${slug}`}>
              <DropdownItem id={`embed${_id}`}>
                <a target="_blank">
                  <Icon size="16px" icon={showPoll} />
                  <LinkText>Ankete git</LinkText>
                </a>
              </DropdownItem>
            </Link>
            <Link as={`/dashboard/editor/${slug}`} href={`/dashboard/editor?slug=${slug}`}>
              <DropdownItem id={`update${_id}`}>
                <Icon size="16px" icon={edit} />
                <LinkText>Güncelle</LinkText>
              </DropdownItem>
            </Link>
            <DropdownItem onClick={this.toggleDeleteModal} id={`delete${_id}`}>
              <Icon size="16px" icon={remove2} />
              <LinkText>Sil</LinkText>
            </DropdownItem>
            <Link as={`/dashboard/istatistikler/${slug}`} href={`/dashboard/stats?slug=${slug}`}>
              <DropdownItem>
                <Icon size="16px" icon={stats} />
                <LinkText>İstatistikler</LinkText>
              </DropdownItem>
            </Link>
            <DropdownItem onClick={this.toggle} id={`iframe${_id}`}>
              <Icon size="16px" icon={iframe} />
              <LinkText>Iframe kodu</LinkText>
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <Iframe modal={modal} pollName={slug} toggle={this.toggle} />
        <Modal isOpen={showDelete} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>Uyarı</ModalHeader>
          <ModalBody>
              Anketi silmek istediğinize emin misiniz?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.onClick(_id)}>Sil</Button>
            {' '}
            <Button color="secondary" onClick={this.toggleDeleteModal}>Hayır</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Actions;
