import React from 'react';
import { shallow } from 'enzyme';
import { Neck } from '../../../src/features/chords';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Neck />);
  expect(renderedComponent.find('.chords-neck').length).toBe(1);
});
