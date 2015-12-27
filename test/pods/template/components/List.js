import { expect, assert } from 'chai';
import { stub } from 'sinon';
import React from 'react';
import sd from 'skin-deep';
import { isElementOfType } from 'react-addons-test-utils';
import shallowRender from '../../../utils/shallow-render';
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
  currentTemplate: iPhone_6.id,
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
});