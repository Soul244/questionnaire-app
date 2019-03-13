import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import {
  Button, Card, CardBody, UncontrolledTooltip,
} from 'reactstrap';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import ToolButton from '../Button/ToolButton';
import Icon, {
  video, text, image, audio, save, preview, arrowUp, publish,
} from '../../../css/icons';

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
            <PlusIcon size="md" outline block onClick={this.toggle} show={show ? 1 : 0} id="toggle">
              <Icon size="48px" icon={arrowUp} />
            </PlusIcon>
            <HideableContent show={show}>
              <ToolButton icon={text} tooltip="Metin sorusu ekle." color="warning" id="text" onClick={() => addQuestion('text')} />
              <ToolButton icon={video} tooltip="Video sorusu ekle." color="danger" id="video" onClick={() => addQuestion('video')} />
              <ToolButton icon={image} tooltip="Görsel sorusu ekle." color="info" id="image" onClick={() => addQuestion('image')} />
              <ToolButton icon={audio} tooltip="Ses sorusu ekle." color="primary" id="audio" onClick={() => addQuestion('audio')} />
              <ToolButton content="GIF" tooltip="Gif sorusu ekle." color="secondary" id="gif" onClick={() => addQuestion('gif')} />
              <ToolButton content="H1" tooltip="Büyük fontlu metin sorusu ekle." color="secondary" id="heading" onClick={() => addQuestion('heading')} />
              <Link as="/on-izleme/true" href={`/poll/preview?ispreview=${true}`}>
                <ToolButton icon={preview} tooltip="Anketi kaydetmeden önce önizle." color="secondary" id="preview" />
              </Link>
              <ToolButton icon={save} tooltip="Anketi güncelle veya kaydet." type="submit" outline block color="success" id="save" />
              <ToolButton icon={publish} tooltip="Anketi yayınla." type="button" color="success" id="publish" />
            </HideableContent>
            <UncontrolledTooltip placement="left" target="toggle">Soru ekleme aracını aç veya kapa.</UncontrolledTooltip>
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
