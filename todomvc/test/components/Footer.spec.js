import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Footer from '../../components/Footer';
import { SHOW_ALL, SHOW_ACTIVE } from '../../constants/TodoFilters';

function setup(propOverrides) {
  const props = Object.assign({
    completedCount: 0,
    activeCount: 0,
    filter: SHOW_ALL,
    onClearCompleted: expect.createSpy(),
    onShow: expect.createSpy()
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<Footer { ...props } />);

  const output = renderer.getRenderOutput();

  return {
    props,
    renderer,
    output
  }
}

describe('components', () => {
  describe('Footer', () => {
    it('should render container', () => {
      
    })
  })
})