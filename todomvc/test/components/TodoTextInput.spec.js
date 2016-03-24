import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoTextInput from '../../components/TodoTextInput';

function setup(propOverrides) {
  const props = Object.assign({
    newTodo: false,
    onSave: expect.createSpy(),
    placeholder: 'What needs to be done?',
    text: 'Use Redux',
    editing: false
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <TodoTextInput { ...props } />
  );

  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('components', () => {
  describe('TodoTextInput', () => {
    it('should render correctly', () => {
      const { output } = setup();
      expect(output.props.placeholder).toEqual('What needs to be done?');
      expect(output.props.value).toEqual('Use Redux');
      expect(output.props.className).toEqual('');
    })

    it('should render correctly when editing=true', () => {

    })
  })
})

NODE_ENV=production pm2 start