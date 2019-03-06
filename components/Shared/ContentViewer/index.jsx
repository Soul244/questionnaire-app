import React from 'react';
import Audio from './Audio';
import Gif from './Gif';
import Heading from './Heading';
import Image from './Image';
import Text from './Text';
import Video from './Video';

export {
  Audio, Gif, Heading, Image, Text, Video,
};

const Type = ({ type, content }) => {
  switch (type) {
    case 'text':
      return <Text content={content} data-test="text" />;
    case 'heading':
      return <Heading content={content} data-test="heading" />;
    case 'image':
      return <Image content={content} data-test="image" />;
    case 'video':
      return <Video content={content} data-test="video" />;
    case 'gif':
      return <Gif content={content} data-test="gif" />;
    case 'audio':
      return <Audio content={content} data-test="audio" />;
    default:
      return 'unknown type';
  }
};

export default Type;
