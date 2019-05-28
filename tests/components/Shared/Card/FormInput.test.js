import React from 'react';
import { shallow } from 'enzyme';
import findByAttr from '../../../utils';
import { FormInput } from '~components/Shared';

const setUp = (props = {}) => {
  const component = shallow(<FormInput {...props} />);
  return component;
};

describe('FormInput Component', () => {
  let component;
  beforeEach(() => {
    component = setUp({
      title: 'Card Title',
    });
  });

  it('Should render without errors', () => {
    const formInput = findByAttr(component, 'form-input');
    expect(formInput.length).toBe(1);
  });

  it('Should show title', () => {
    const title = findByAttr(component, 'title');
    expect(title.contains('Card Title')).toEqual(true);
  });
});
