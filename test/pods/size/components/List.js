import { expect, assert } from 'chai';
import { stub } from 'sinon';
import React from 'react';
import sd from 'skin-deep';
import { isElementOfType } from 'react-addons-test-utils';
import shallowRender from '../../../utils/shallow-render';
import { size } from 'lodash';

import SizeList from 'pods/size/components/List';
import SizeItem from 'pods/size/components/Item';

const actions = {
  removeSize: () => true,
  updateSize: () => true
};
const props = {
  sizes: {
    0: {
      id: 0,
      multiplier: '1x',
      suffix: '',
      format: 'png'
    },

    1: {
      id: 1,
      multiplier: '2x',
      suffix: '@2x',
      format: 'jpg'
    }
  },
  ...actions
};

export default describe('List', () => {
  let errorStub;
  const render = shallowRender(SizeList, props);
  const onlySizeRender = shallowRender(SizeList, {
    sizes: {
      0: props.sizes[0]
    },

    ...actions
  });
  const items = render.children.filter(item => isElementOfType(item, SizeItem));
  const item = items[0];
  const lastItem = items[1];

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

  it('should display a list of SizeItem components', () => {
    expect(items.length).to.equal(size(props.sizes));
  });

  it('should pass correct props to SizeItem', () => {
    let expectedProps = {
      ...props.sizes[0],
      isOnlySize: false,
      isLastSize: false,
      removeSize: actions.removeSize,
      updateSize: actions.updateSize
    };

    expect(item.props).to.deep.equal(expectedProps);
  });

  it('should pass isLastSize as true for last size item', () => {
    let expectedProps = {
      ...props.sizes[1],
      isOnlySize: false,
      isLastSize: true,
      removeSize: actions.removeSize,
      updateSize: actions.updateSize
    };

    expect(lastItem.props).to.deep.equal(expectedProps);
  });

  it('should pass isOnlySize and isLastSize as true for only size item', () => {
    let onlySizeItem = onlySizeRender.children.filter(item => isElementOfType(item, SizeItem))[0];
    let expectedProps = {
      ...onlySizeRender.props.sizes[0],
      isOnlySize: true,
      isLastSize: true,
      removeSize: actions.removeSize,
      updateSize: actions.updateSize
    };

    expect(onlySizeItem.props).to.deep.equal(expectedProps);
  });
});