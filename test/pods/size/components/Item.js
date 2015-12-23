import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import Item from 'pods/size/components/Item';

require('../../../utils/user-agent');

function setup() {
  const actions = {
    removeSize: spy(),
    updateSize: spy()
  };
  const props = {
    id: 1,
    multiplier: '1x',
    suffix: '@1x',
    format: 'png',
    isOnlySize: false,
    isLastSize: false,
    ...actions
  };
  const component = renderIntoDocument(
    <Item
      { ...props }
    />
  );
  const onlySizeComponent = renderIntoDocument(
    <Item
      { ...props }
      isOnlySize={true}
    />
  );

  return {
    actions,
    component: {
      node: component,
      removeButton: findRenderedDOMComponentWithClass(component, 'remove button')
    },
    onlySizeComponent: {
      node: onlySizeComponent,
      removeButton: findRenderedDOMComponentWithClass(onlySizeComponent, 'remove button')
    },
    multiplier: {
      input: findRenderedDOMComponentWithClass(component, 'multiplier input'),
      value: function() { return this.input.value }
    },
    suffix: {
      input: findRenderedDOMComponentWithClass(component, 'suffix input'),
      value: function() { return this.input.value }
    },
    format: {
      input: findRenderedDOMComponentWithClass(component, 'format dropdown'),
      menu: function() { return this.input.getElementsByClassName('menu')[0] },
      value: function() { return this.input.getElementsByClassName('placeholder text')[0].textContent }
    }
  };
}

describe('Item', () => {
  const {
    actions,
    component,
    onlySizeComponent,
    multiplier,
    suffix,
    format,
    removeButton
  } = setup();

  it('should display multiplier', () => {
    expect(multiplier.value()).to.equal('1x');
  });

  it('should call updateSize when user edits multiplier', () => {
    let node = multiplier.input;

    node.value = '2x'
    Simulate.change(node);

    expect(actions.updateSize.called).to.be.true;
    actions.updateSize.reset();
  });

  it('should display suffix', () => {
    expect(suffix.value()).to.equal('@1x');
  });

  it('should call updateSize when user edits suffix', () => {
    let node = suffix.input;

    node.value = '@2x'
    Simulate.change(node);

    expect(actions.updateSize.called).to.be.true;
    actions.updateSize.reset();
  });

  it('should display format', () => {
    expect(format.value().toLowerCase()).to.equal('png');
  });

  it('should call updateSize when user edits format', () => {
    let node = format.input;
    let menu = format.menu();
    let secondItem = menu.getElementsByClassName('item')[1];

    Simulate.click(node);
    Simulate.click(secondItem);

    expect(actions.updateSize.called).to.be.true;
    actions.updateSize.reset();
  });

  it('should call removeSize when user clicks remove button', () => {
    let node = component.removeButton;

    Simulate.click(node);

    expect(actions.removeSize.called).to.be.true;
    actions.removeSize.reset();
  });

  it('should not call removeSize when user clicks remove button if isOnlySize', () => {
    let node = onlySizeComponent.removeButton;

    Simulate.click(node);

    expect(actions.removeSize.called).to.be.false;
    actions.removeSize.reset();
  });
});