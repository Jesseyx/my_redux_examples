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
      const { output } = setup({ editing: true });
      expect(output.props.className).toEqual('edit');
    })

    it('should render correctly when newTodo=true', () => {
      const { output } = setup({ newTodo: true });
      expect(output.props.className).toEqual('new-todo');
    })

    it('should update value on change', () => {
      const { output, renderer } = setup();
      output.props.onChange({ target: { value: 'Use Radox' }});
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('Use Radox');
    })

    it('should call onSave on enter key press', () => {
      const { output, props } = setup();
      output.props.onKeyDown({ target: { value: 'Use Redux' }, which: 13 });
      expect(props.onSave).toHaveBeenCalledWith('Use Redux');
    })

    it('should reset state on enter key press if newTodo', () => {
      const { output, renderer } = setup({ newTodo: true });
      output.props.onKeyDown({ target: { value: 'Use Redux' }, which: 13 });
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('');
    })

    it('should call onSave on blue', () => {
      const { output, props } = setup();
      output.props.onBlur({ target: { value: 'Use Redux' }});
      expect(props.onSave).toHaveBeenCalledWith('Use Redux');
    })

    it('shouldnt call onSave on blur if newTodo', () => {
      const { output, props } = setup({ newTodo: true });
      output.props.onBlur({ target: { value: 'Use Redux' }});
      expect(props.onSave.calls.length).toBe(0);
    })
  })
})