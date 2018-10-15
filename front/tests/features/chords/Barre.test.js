import React from 'react';
import { shallow } from 'enzyme';
import { Barre } from '../../../src/features/chords';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Barre />);
  expect(renderedComponent.find('.chords-barre').length).toBe(1);
});
