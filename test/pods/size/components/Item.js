import { expect, assert } from 'chai';
import { stub, spy } from 'sinon';
import React from 'react';
import { isElementOfType } from 'react-addons-test-utils';
import { findWithRef } from 'react-shallow-testutils';
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
    let Dropdown = findWithRef(render.output, 'multiplierDropdown');
    let label = findWithRef(render.output, 'multiplierLabel');

    it('should render a dropdown', () => {
      expect(Dropdown).to.be.ok;
    });

    it('should render a label', () => {
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
    let input = findWithRef(render.output, 'suffixInput');
    let label = findWithRef(render.output, 'suffixLabel');

    it('should render an input', () => {
      expect(input).to.be.ok;
    });

    it('should render a label', () => {
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
    let Dropdown = findWithRef(render.output, 'formatDropdown');
    let label = findWithRef(render.output, 'formatLabel');

    it('should render a dropdown', () => {
      expect(Dropdown).to.be.ok;
    });

    it('should render a label', () => {
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
    let button = findWithRef(render.output, 'removeButton');

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
      let button = findWithRef(onlySizeRender.output, 'removeButton');

      button.props.onClick();

      let action = actions.removeSize;
      let args = action.args[0];

      expect(action.called).to.be.false;

      action.reset();
    });
  });
});