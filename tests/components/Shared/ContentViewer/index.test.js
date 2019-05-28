import React from 'react';
import { mount } from 'enzyme';
import findByAttr from '../../../utils';
import { ContentViewer } from '~components/Shared';

const setUp = (props = {}) => {
  const component = mount(<ContentViewer {...props} />);
  return component;
};

describe('ContentViewer Component', () => {
  it('Should render Audio compenent', () => {
    const component = setUp({ type: 'audio', content: 'audio-link' });
    const wrapper = findByAttr(component, 'audio');
    const audioSelf = findByAttr(component, 'audio-self');
    expect(wrapper.length).toBe(1);
    expect(audioSelf.props().src).toEqual('audio-link');
  });

  it('Should render Gif component', () => {
    const component = setUp({ type: 'gif', content: 'gif-link' });
    const gif = findByAttr(component, 'gif');
    const gifSelf = findByAttr(component, 'gif-self');
    expect(gif.length).toBe(1);
    expect(gifSelf.props().src).toEqual('gif-link');
  });

  it('Should render Heading component', () => {
    const component = setUp({ type: 'heading', content: 'Heading Component' });
    const heading = findByAttr(component, 'heading');
    const headingSelf = findByAttr(component, 'heading-self');
    expect(heading.length).toBe(1);
    expect(headingSelf.contains('Heading Component')).toEqual(true);
  });

  it('Should render Image component', () => {
    const component = setUp({ type: 'image', content: 'image-link' });
    const image = findByAttr(component, 'image');
    const imageSelf = findByAttr(component, 'image-self');
    expect(image.length).toBe(1);
    expect(imageSelf.props().src).toEqual('image-link');
  });

  it('Should render Text component', () => {
    const component = setUp({ type: 'text', content: 'Text Component' });
    const text = findByAttr(component, 'text');
    const textSelf = findByAttr(component, 'text-self');
    expect(text.length).toBe(1);
    expect(textSelf.contains('Text Component'));
  });

  it('Should render Video component', () => {
    const component = setUp({ type: 'video', content: 'video-link' });
    const video = findByAttr(component, 'video');
    expect(video.length).toBe(1);
  });
});
