import React from 'react';
import { shallow } from 'enzyme';
import findByAttr from '../../../utils';
import { FormEditor } from '../../../../components/Shared';

const setUp = (props = {}) => {
  const component = shallow(<FormEditor {...props} />);
  return component;
};

describe('FormEditor Component', () => {
  let component;
  beforeEach(() => {
    component = setUp({
      title: 'Card Title',
    });
  });

  it('Should render without errors', () => {
    const wrapper = findByAttr(component, 'form-editor');
    expect(wrapper.length).toBe(1);
  });

  it('Should show title', () => {
    const title = findByAttr(component, 'title');
    expect(title.contains('Card Title')).toEqual(true);
  });
});
