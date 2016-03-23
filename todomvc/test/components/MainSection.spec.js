import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import MainSection from '../../components/MainSection';
import TodoItem from '../../components/TodoItem';
import Footer from '../../components/Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/TodoFilters';

function setup(propOverrides) {
  const props = Object.assign({
    todos: [
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        completed: true,
        id: 1
      }
    ],
    actions: {
      deleteTodo: expect.createSpy(),
      editTodo: expect.createSpy(),
      completeTodo: expect.createSpy(),
      completeAll: expect.createSpy(),
      clearCompleted: expect.createSpy()
    }
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<MainSection { ...props } />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const { output } = setup();
      expect(output.type).toBe('section');
      expect(output.props.className).toBe('main');
    })

    describe('toggle all input', () => {
      it('should render', () => {
        const { output } = setup();
        const [ toggle ] = output.props.children;
        expect(toggle.type).toBe('input');
        expect(toggle.props.type).toBe('checkbox');
        expect(toggle.props.checked).toBe(false);
      })

      it('should be checked if all todos completed', () => {
        const { output } = setup({
          todos: [
            { text: 'Use Redux', completed: true, id: 0 }
          ]
        });

        const [ toggle ] = output.props.children;
        expect(toggle.props.checked).toBe(true);
      })

      it('should call completeAll on change', () => {
        const { output, props } = setup();
        const [ toggle ] = output.props.children;
        toggle.props.onChange({});
        expect(props.actions.completeAll).toHaveBeenCalled();
      })
    })

    describe('footer', () => {
      it('should render', () => {
        const { output } = setup();
        const [ , , footer ] = output.props.children;
        expect(footer.type).toBe(Footer);
        expect(footer.props.completedCount).toBe(1);
        expect(footer.props.activeCount).toBe(1);
        expect(footer.props.filter).toBe(SHOW_ALL);
      })

      it('onShow should set the filter', () => {
        const { output, renderer } = setup();
        const [ , , footer ] = output.props.children;
        footer.props.onShow(SHOW_COMPLETED);
        const updated = renderer.getRenderOutput();
        const [ , , updatedFooter ] = updated.props.children;
        expect(updatedFooter.props.filter).toBe(SHOW_COMPLETED);
      })

      it('onClearCompleted should call clearCompleted', () => {
        const { output, props } = setup();
        const [ , , footer ] = output.props.children;
        footer.props.onClearCompleted();
        expect(props.actions.clearCompleted).toHaveBeenCalled();
      })
    })
  })
})