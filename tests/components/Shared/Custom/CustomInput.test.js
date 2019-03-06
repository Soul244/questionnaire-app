import React from 'react';
import { shallow, mount } from 'enzyme';
import findByAttr from '../../../utils';
import 'jest-styled-components';
import { CustomInput } from '../../../../components/Shared';

const setUp = (props = {}, method = 'shallow') => {
  let component;
  if (method === 'shallow') {
    component = shallow(<CustomInput {...props} />);
  } else if (method === 'mount') {
    component = mount(<CustomInput {...props} />);
  }
  return component;
};

const props = {
  inputLabel: 'Şifreniz:',
  value: '123456',
  error: null,
};

const errorProps = {
  inputLabel: 'Şifreniz:',
  value: '123456',
  error: 'error happened',
};

describe('CustomInput Component', () => {
  it('Should render container', () => {
    const component = setUp(props);
    const container = findByAttr(component, 'container');
    expect(container.length).toBe(1);
  });

  describe('Input Tests', () => {
    it('Should render input', () => {
      const component = setUp(props);
      const input = findByAttr(component, 'input');
      expect(input.length).toBe(1);
    });
    it('Should input border red', () => {
      const component = setUp(errorProps, 'mount');
      const input = findByAttr(component, 'input');
      expect(input).toHaveStyleRule('border-color', 'red !important');
    });
  });

  describe('Label Tests', () => {
    it('Should render label', () => {
      const component = setUp(props);
      const label = findByAttr(component, 'label');
      expect(label.length).toBe(1);
    });
    it('Should show inputLabel', () => {
      const component = setUp(props);
      const label = findByAttr(component, 'label');
      expect(label.contains('Şifreniz:')).toEqual(true);
    });
    it('Should show error instead inputLabel', () => {
      const component = setUp(errorProps);
      const label = findByAttr(component, 'label');
      expect(label.contains('error happened')).toEqual(true);
    });
    it('Should label color red', () => {
      const component = setUp(errorProps, 'mount');
      const label = findByAttr(component, 'label');
      expect(label).toHaveStyleRule('color', 'red !important');
    });
    it('Should label color #999', () => {
      const component = setUp(props, 'mount');
      const label = findByAttr(component, 'label');
      expect(label).toHaveStyleRule('color', '#999');
    });
  });
});
