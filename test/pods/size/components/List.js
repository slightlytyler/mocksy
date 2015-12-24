import { expect, assert } from 'chai';
import { stub } from 'sinon';
import React from 'react';
import sd from 'skin-deep';
import { isElementOfType } from 'react-addons-test-utils';
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

describe('List', () => {
  const errorStub = stub(console, 'error');
  const tree = sd.shallowRender(React.createElement(SizeList, props));
  const vdom = tree.getRenderOutput();
  const items = vdom.props.children.filter(item => isElementOfType(item, SizeItem));
  const item = items[0];
  const lastItem = items[1];

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
    let onlySizeProps = {
      sizes: {
        0: props.sizes[0]
      },

      ...actions
    };
    let onlySizeTree = sd.shallowRender(React.createElement(SizeList, onlySizeProps));
    let onlySizeVdom = onlySizeTree.getRenderOutput();
    let onlySizeItem = onlySizeVdom.props.children.filter(item => isElementOfType(item, SizeItem))[0];
    let expectedProps = {
      ...onlySizeProps.sizes[0],
      isOnlySize: true,
      isLastSize: true,
      removeSize: actions.removeSize,
      updateSize: actions.updateSize
    };

    expect(onlySizeItem.props).to.deep.equal(expectedProps);
  });
});