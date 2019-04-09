import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import {
  Button, Card, CardBody,
} from 'reactstrap';
import styled from 'styled-components';
import ToolButton from '../Button/ToolButton';
import Icon, {
  video,
  text,
  image,
  audio,
  save,
  preview,
  arrowUp,
  publish,
} from '../../../css/icons';

const ButtonStyled = styled(Button)`
  width: 40px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlusIcon = styled(ButtonStyled)`
  position: absolute;
  top: 0; 
  left: ${props => (props.show ? '-220px' : '0px')};
  transition: .3s cubic-bezier(.685,.0473,.346,1);
  right: 0;
  bottom: 0;
  z-index: 7;
  margin-top: auto;
  margin-bottom: auto;
  background-color: white;
  svg {
    transform: rotate(${props => (props.show ? '90deg' : '270deg')});
    transition: transform 0.4s ease;
  }
`;

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform:${props => (props.show ? 'translateZ(0)' : 'translate3d(240px,0,0);')};
  transition: .5s cubic-bezier(.685,.0473,.346,1);
  overflow: hidden;
  width: 180px;
`;

const Container = styled.div`
  position: fixed;
  width:${props => (props.show ? '180px' : '40px')};
  z-index: 6;
  right: 0;
  top: 15%;
  border-radius: 8px !important;
`;

class QuestionTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (window.innerWidth <= 992) {
      this.setState({
        show: false,
      });
    } else {
      this.setState({
        show: true,
      });
    }
  };


  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  render() {
    const { addQuestion } = this.props;
    const { show } = this.state;
    return (
      <Container show={show ? 1 : 0}>
        <PlusIcon
          size="md"
          outline
          block
          onClick={this.toggle}
          show={show ? 1 : 0}
          id="toggle"
        >
          <Icon size="48px" icon={arrowUp} />
        </PlusIcon>
        <CardStyled className="text-center" show={show ? 1 : 0}>
          <CardBody>
            <ToolButton
              content="Yazılı Soru"
              icon={text}
              tooltip="Metin sorusu ekle."
              color="warning"
              id="text"
              onClick={() => addQuestion('text')}
            />
            <ToolButton
              content="Video Soru"
              icon={video}
              tooltip="Video sorusu ekle."
              color="danger"
              id="video"
              onClick={() => addQuestion('video')}
            />
            <ToolButton
              content="Görsel Soru"
              icon={image}
              tooltip="Görsel sorusu ekle."
              color="info"
              id="image"
              onClick={() => addQuestion('image')}
            />
            <ToolButton
              content="Sesli Soru"
              icon={audio}
              tooltip="Ses sorusu ekle."
              color="primary"
              id="audio"
              onClick={() => addQuestion('audio')}
            />
            <ToolButton
              content="GIF Sorusu"
              tooltip="Gif sorusu ekle."
              color="secondary"
              id="gif"
              onClick={() => addQuestion('gif')}
            />
            <ToolButton
              content="Aralık Sorusu"
              tooltip="Aralık Sorusu."
              color="secondary"
              id="scoring"
              onClick={() => addQuestion('scoring')}
            />
            <ToolButton
              content="Başlık"
              tooltip="Büyük fontlu metin sorusu ekle."
              color="secondary"
              id="heading"
              onClick={() => addQuestion('heading')}
            />
            <Link as="/on-izleme/true" href={`/dashboard/preview?ispreview=${true}`}>
              <ToolButton
                content="Önizle"
                icon={preview}
                tooltip="Anketi kaydetmeden önce önizle."
                color="secondary"
                id="preview"
              />
            </Link>
            <ToolButton
              content="Kaydet"
              icon={save}
              tooltip="Anketi güncelle veya kaydet."
              type="submit"
              outline
              block
              color="success"
              id="save"
            />
            <ToolButton
              content="Yayınla"
              icon={publish}
              tooltip="Anketi yayınla."
              type="button"
              color="success"
              id="publish"
            />
          </CardBody>
        </CardStyled>
      </Container>
    );
  }
}

QuestionTool.propTypes = {
  addQuestion: PropTypes.func.isRequired,
};

export default QuestionTool;
