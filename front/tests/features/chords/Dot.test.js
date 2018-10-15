import React from 'react';
import { shallow } from 'enzyme';
import { Dot } from '../../../src/features/chords';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Dot />);
  expect(renderedComponent.find('.chords-dot').length).toBe(1);
});
