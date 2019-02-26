import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
} from 'reactstrap';
import styled from 'styled-components';

import Icon, {
  video, text, image, audio, arrowLeft,
} from '../../css/icons';

const ButtonStyled = styled(Button)`
  width: 40px;
  height: 40px;
  margin: 0.2rem!important;
  display:flex;
  justify-content:center;
  text-align:center;
  align-items: center;
`;

const ButtonWithIcon = styled(ButtonStyled)`
  padding: 0 auto;
`;

const ButtonText = styled.p`
  margin: 0 auto;
  font-size:0.75rem;
`;

const CardMax = styled.div`
display:flex;
flex-direction:row;
margin: 0 10px;
`;

const PlusIcon = styled(ButtonStyled)`
  width: 120px;
  height: 40px;
  svg {
    transform: rotate(${props => (props.show ? '0deg' : '180deg')});
    transition: transform 0.4s ease;
  }
`;

const HideableContent = styled.div`
  display:flex;
  flex-direction:row;
  max-width: ${props => (props.show ? '500px' : '0')};
  transition: max-width 0.4s ease;
  overflow: hidden;
`;

class AnswerTool extends React.Component {
  render() {
    const {
      addAnswer, questionOrder, toggle, show,
    } = this.props;
    return (
      <CardMax body className="text-center">
        <PlusIcon size="md" outline block onClick={toggle} show={show ? 1 : 0}>
          <ButtonText>Cevap Ekle</ButtonText>
          <Icon size="24px" icon={arrowLeft} />
        </PlusIcon>
        <HideableContent show={show ? 1 : 0}>
          <ButtonWithIcon size="md" outline block color="warning" onClick={() => addAnswer('text', questionOrder)}><Icon size="24px" icon={text} /></ButtonWithIcon>
          {' '}
          <ButtonWithIcon size="md" outline block color="danger" onClick={() => addAnswer('external-media', questionOrder)}><Icon size="24px" icon={video} /></ButtonWithIcon>
          {' '}
          <ButtonWithIcon size="md" outline block color="info" onClick={() => addAnswer('image', questionOrder)}><Icon size="24px" icon={image} /></ButtonWithIcon>
          {' '}
          <ButtonWithIcon size="md" outline block color="primary" onClick={() => addAnswer('audio', questionOrder)}><Icon size="24px" icon={audio} /></ButtonWithIcon>
          {' '}
          <ButtonStyled size="md" outline block color="secondary" onClick={() => addAnswer('gif', questionOrder)}><ButtonText>GIF</ButtonText></ButtonStyled>
          {' '}
          <ButtonStyled size="md" outline block color="secondary" onClick={() => addAnswer('heading', questionOrder)}><ButtonText>H1</ButtonText></ButtonStyled>
        </HideableContent>
      </CardMax>
    );
  }
}

AnswerTool.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  questionOrder: PropTypes.number.isRequired,
};

export default AnswerTool;
