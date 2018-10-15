import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/chords/DefaultPage';

describe('chords/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      chords: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.chords-default-page').length
    ).toBe(1);
  });
});
