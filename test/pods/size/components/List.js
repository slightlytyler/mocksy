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

  it('should pass propTypes check', () => {
    assert(!errorStub.called, `\n${errorStub.args.join('\n')}`);
  });

  it('should display a list of SizeItem components', () => {
    expect(items.length).to.equal(size(props.sizes));
  });
});