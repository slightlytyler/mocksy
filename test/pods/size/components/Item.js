import { expect, assert } from 'chai';
import { stub, spy } from 'sinon';
import React from 'react';
import { isElementOfType } from 'react-addons-test-utils';
import shallowRender from '../../../utils/shallow-render';

import SizeItem from 'pods/size/components/Item';
import DropdownComponent from 'components/Dropdown';

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

export default describe('Item', () => {
  let errorStub;
  const render = shallowRender(SizeItem, props);
  const onlySizeRender = shallowRender(SizeItem,
    Object.assign({}, props, {
      isOnlySize: true
    })
  );

  beforeEach(done => {
    errorStub = stub(console, 'error');
    done();
  });

  afterEach(done => {
     errorStub.restore();
     done();
  });

  it('should pass propTypes check', () => {
    assert(!errorStub.called, `\n${errorStub.args.join('\n')}`);
  });

  describe('multiplier dropdown', () => {
    let container = render.children.filter(child => child.ref === 'multiplierDropdownContainer')[0];
    let Dropdowns = container.props.children.filter(child => isElementOfType(child, DropdownComponent));
    let Dropdown = Dropdowns[0];
    let labels = container.props.children.filter(child => isElementOfType(child, 'label'));
    let label = labels[0];

    it('should render a dropdown', () => {
      expect(Dropdowns.length).to.equal(1);
    });

    it('should render a label', () => {
      expect(labels.length).to.equal(1);
      expect(label.props.children).to.equal('Size');
    });

    it('should have the multiplier prop as its value', () => {
      expect(Dropdown.props.value).to.equal(props.multiplier);
    });

    it('should have class prop multiplierOptions as its options', () => {
      expect(Dropdown.props.options).to.deep.equal(render.instance.multiplierOptions);
    });

    it('should call updateSize onChange', () => {
      let value = 'test';

      Dropdown.props.onChange(value);

      let action = actions.updateSize;
      let args = action.args[0];

      expect(action.called).to.be.true;
      expect(args[0]).to.equal(props.id);
      expect(args[1]).to.deep.equal({
        multiplier: value
      });

      action.reset();
    });
  });

  describe('suffix input', () => {
    let container = render.children.filter(child => child.ref === 'suffixInputContainer')[0];
    let inputs = container.props.children.filter(child => isElementOfType(child, 'input'));
    let input = inputs[0];
    let labels = container.props.children.filter(child => isElementOfType(child, 'label'));
    let label = labels[0];

    it('should render an input', () => {
      expect(inputs.length).to.equal(1);
    });

    it('should render a label', () => {
      expect(labels.length).to.equal(1);
      expect(label.props.children).to.equal('Suffix');
    });

    it('should have the suffix prop as its value', () => {
      expect(input.props.value).to.equal(props.suffix);
    });

    it('should call updateSize onChange', () => {
      let value = 'test';

      input.props.onChange({
        target: {
          value
        }
      });

      let action = actions.updateSize;
      let args = action.args[0];

      expect(action.called).to.be.true;
      expect(args[0]).to.equal(props.id);
      expect(args[1]).to.deep.equal({
        suffix: value
      });

      action.reset();
    });
  });

  describe('format dropdown', () => {
    let container = render.children.filter(child => child.ref === 'formatDropdownContainer')[0];
    let Dropdowns = container.props.children.filter(child => isElementOfType(child, DropdownComponent));
    let Dropdown = Dropdowns[0];
    let labels = container.props.children.filter(child => isElementOfType(child, 'label'));
    let label = labels[0];

    it('should render a dropdown', () => {
      expect(Dropdowns.length).to.equal(1);
    });

    it('should render a label', () => {
      expect(labels.length).to.equal(1);
      expect(label.props.children).to.equal('Format');
    });

    it('should have the format prop as its value', () => {
      expect(Dropdown.props.value).to.equal(props.format);
    });

    it('should have class prop formatOptions as its options', () => {
      expect(Dropdown.props.options).to.deep.equal(render.instance.formatOptions);
    });

    it('should call updateSize onChange', () => {
      let value = 'test';

      Dropdown.props.onChange(value);

      let action = actions.updateSize;
      let args = action.args[0];

      expect(action.called).to.be.true;
      expect(args[0]).to.equal(props.id);
      expect(args[1]).to.deep.equal({
        format: value
      });

      action.reset();
    });
  });

  describe('remove button', () => {
    let button = render.children.filter(child => child.ref === 'removeButton')[0];

    it('should render', () => {
      expect(button).to.be.ok;
    });

    it('should call removeSize onClick if it is not the only size', () => {
      button.props.onClick();

      let action = actions.removeSize;
      let args = action.args[0];

      expect(action.called).to.be.true;
      expect(args[0]).to.equal(props.id);

      action.reset();
    });

    it('should not call removeSize onClick if it is the only size', () => {
      let onlySizeButton = onlySizeRender.children.filter(child => child.ref === 'removeButton')[0];

      onlySizeButton.props.onClick();

      let action = actions.removeSize;
      let args = action.args[0];

      expect(action.called).to.be.false;

      action.reset();
    });
  });
});