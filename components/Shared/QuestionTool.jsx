import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import {
  Button, Card, CardBody, UncontrolledTooltip,
} from 'reactstrap';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Icon, {
  video, text, image, audio, save, preview, arrowUp, publish,
} from '../../css/icons';

const ButtonStyled = styled(Button)`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PlusIcon = styled(ButtonStyled)`
  margin-bottom: ${props => (props.show ? '0.5rem' : '0')};
  svg {
    transform: rotate(${props => (props.show ? '0deg' : '180deg')});
    transition: transform 0.4s ease;
  }
`;

const CardStyled = styled(Card)`
  position: fixed;
  z-index:1;
  right: 1rem;
  top: 15%;
  background-color: #fff;
  border-radius: 150px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index:5;
`;

const CardBodyStyled = styled(CardBody)`
  padding:0.25rem !important;
`;

const HideableContent = styled.div`
  max-height: ${props => (props.show ? '600px' : '0')};
  transition: max-height 0.3s ease;
  overflow: hidden;
  padding: ${props => (props.show ? '0.2rem' : '0rem')};;
`;

//      <CardTitle>Yeni Soru Ekle</CardTitle>

class QuestionTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  render() {
    const { addQuestion } = this.props;
    const { show } = this.state;
    return (
      <Draggable>
        <CardStyled className="text-center">
          <CardBodyStyled>
            <PlusIcon size="md" outline block onClick={this.toggle} show={show ? 1: 0} id="toggle">
              <Icon size="48px" icon={arrowUp} />
            </PlusIcon>
            <HideableContent show={show}>
              <ButtonStyled size="md" outline block color="warning" id="text" onClick={() => addQuestion('text')}>
                <Icon size="24px" icon={text} />
              </ButtonStyled>
              <ButtonStyled size="md" outline block color="danger" id="video" onClick={() => addQuestion('external-media')}>
                <Icon size="24px" icon={video} />
              </ButtonStyled>
              <ButtonStyled size="md" outline block color="info" id="image" onClick={() => addQuestion('image')}>
                <Icon size="24px" icon={image} />
              </ButtonStyled>
              <ButtonStyled size="md" outline block color="primary" id="audio" onClick={() => addQuestion('audio')}>
                <Icon size="24px" icon={audio} />
              </ButtonStyled>
              <ButtonStyled size="md" outline block color="secondary" id="gif" onClick={() => addQuestion('gif')}>GIF</ButtonStyled>
              <ButtonStyled size="md" outline block color="secondary" id="heading" onClick={() => addQuestion('heading')}>H1</ButtonStyled>
              <Link as="/on-izleme/true" href={`/poll/preview?ispreview=${true}`}>
                <ButtonStyled size="md" outline block color="secondary" id="preview">
                  <Icon size="24px" icon={preview} />
                </ButtonStyled>
              </Link>
              <ButtonStyled type="submit" outline block color="success" id="save">
                <Icon size="24px" icon={save} />
              </ButtonStyled>
              <ButtonStyled type="button" outline block color="success" id="publish">
                <Icon size="24px" icon={publish} />
              </ButtonStyled>
            </HideableContent>
            <UncontrolledTooltip placement="left" target="toggle">Soru ekleme aracını aç veya kapa.</UncontrolledTooltip>
            <UncontrolledTooltip placement="left" target="text">Metin sorusu ekle.</UncontrolledTooltip>
            <UncontrolledTooltip placement="left" target="video">Video sorusu ekle.</UncontrolledTooltip>
            <UncontrolledTooltip placement="left" target="image">Görsel sorusu ekle.</UncontrolledTooltip>
            <UncontrolledTooltip placement="left" target="audio">Ses sorusu ekle.</UncontrolledTooltip>
            <UncontrolledTooltip placement="left" target="gif">Gif sorusu ekle.</UncontrolledTooltip>
            <UncontrolledTooltip placement="left" target="heading">Büyük fontlu metin sorusu ekle.</UncontrolledTooltip>
            <UncontrolledTooltip placement="left" target="preview">Anketi kaydetmeden önce önizle.</UncontrolledTooltip>
            <UncontrolledTooltip placement="left" target="save">Anketi güncelle veya kaydet.</UncontrolledTooltip>
            <UncontrolledTooltip placement="left" target="publish">Anketi yayınla.</UncontrolledTooltip>
          </CardBodyStyled>
        </CardStyled>
      </Draggable>
    );
  }
}

QuestionTool.propTypes = {
  addQuestion: PropTypes.func.isRequired,
};

export default QuestionTool;
