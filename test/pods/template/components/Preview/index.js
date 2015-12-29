import { expect, assert } from 'chai';
import { stub } from 'sinon';
import React from 'react';
import sd from 'skin-deep';
import { isElementOfType } from 'react-addons-test-utils';
import mockery from 'mockery';
import shallowRender from '../../../../utils/shallow-render';

import { iPhone_6 } from 'constants/base-templates';

const actions = {
  setCurrentScreenshot: () => true
};
const props = {
  id: iPhone_6.id,
  dimensions: iPhone_6.dimensions,
  canvasDimensions: {
    width: 100,
    height: 100
  },
  screenshot: '/path/to/screenshot.jpg',
  ...actions
};

export default describe('Preview', () => {

  before(done => {
    mockery.enable();
    done();
  });

  after(done => {
    mockery.disable();
    done();
  });

  let errorStub;
  const render = shallowRender(require('pods/template/components/Preview'), props);

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