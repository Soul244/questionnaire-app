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
      return <Text content={content}></Text>;
    case 'heading':
      return <Heading content={content}></Heading>;
    case 'image':
      return <Image content={content} />;
    case 'external-media':
      return <Video content={content} />;
    case 'gif':
      return <Gif content={content} />;
    case 'audio':
      return <Audio content={content} />;
    default:
      return 'unknown type';
  }
};

export default Type;
