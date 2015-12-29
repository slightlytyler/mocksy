import { expect, assert } from 'chai';
import { stub } from 'sinon';
import React from 'react';
import sd from 'skin-deep';
import { isElementOfType } from 'react-addons-test-utils';
import shallowRender from '../../../test-utils/shallow-render';
import { size } from 'lodash';

import TemplateList from 'pods/template/components/List';
import TemplateItem from 'pods/template/components/Item';
import { iPhone_6, Macbook} from 'constants/base-templates';

const actions = {
  setCurrentTemplate: () => true
};
const props = {
  templates: {
    iPhone_6,
    Macbook
  },
  currentTemplate: Macbook,
  ...actions
};

export default describe('List', () => {
  let errorStub;
  const render = shallowRender(TemplateList, props);
  const items = render.children.filter(item => isElementOfType(item, TemplateItem));
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

  it('should display a list of TemplateItem components', () => {
    expect(items.length).to.equal(size(props.templates));
  });

  it('should pass correct props to TemplateItem', () => {
    let expectedProps = {
      id: iPhone_6.id,
      isActive: false,
      activate: actions.setCurrentTemplate
    };

    expect(item.props).to.deep.equal(expectedProps);
  });

  it('should pass isActive as true for currently active template', () => {
    let expectedProps = {
      id: Macbook.id,
      isActive: true,
      activate: actions.setCurrentTemplate
    };

    expect(lastItem.props).to.deep.equal(expectedProps);
  });
});