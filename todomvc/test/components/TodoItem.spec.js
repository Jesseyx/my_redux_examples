import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import TodoItem from '../../components/TodoItem';
import TodoTextInput from '../../components/TodoTextInput';

function setup(overrideProps) {
  const props = Object.assign({
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false
    },
    editTodo: expect.createSpy(),
    completeTodo: expect.createSpy(),
    deleteTodo: expect.createSpy()
  }, overrideProps);

  const renderer = TestUtils.createRenderer();
  renderer.render(
    <TodoItem { ...props } />
  );

  let output = renderer.getRenderOutput();

  return {
    props,
    renderer,
    output
  }
}

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      const { output } = setup();

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('');

      const div = output.props.children;

      expect(div.type).toBe('div');
      expect(div.props.className).toBe('view');

      const [ input, label, button ] = div.props.children;

      expect(input.type).toBe('input');
      expect(input.props.checked).toBe(false);

      expect(label.type).toBe('label');
      expect(label.props.children).toBe('Use Redux');

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('destroy');
    })
  })
})