import { expect, assert } from 'chai';
import { stub } from 'sinon';
import React from 'react';
import sd from 'skin-deep';
import { isElementOfType } from 'react-addons-test-utils';
import mockery from 'mockery';
import { findWithRef } from 'react-shallow-testutils';
import remoteMock from '../../test-utils/remote-mock';
import shallowRender from '../../test-utils/shallow-render';

const actions = {
  setCurrentTemplate: () => true,
  setCurrentTemplateSet: () => true,
  setCurrentScreenshot: () => true,
  addSize: () => true,
  removeSize: () => true,
  updateSize: () => true
};
const props = {
  templates: {},
  currentTemplate: {},
  currentTemplateSetId: 'default',
  currentScreenshot: '/path/to/screenshot',
  sizes: {},
  actions
};

export default describe('Preview', () => {
  let component,
      render,
      errorStub;

  before(done => {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerMock('remote', remoteMock);
    mockery.registerMock('pods/template/components/Preview', {});
    mockery.registerMock('components/ExportPanel', {});
    errorStub = stub(console, 'error');
    component = require('pods/index/component');
    render = shallowRender(component, props);
    done();
  });

  after(done => {
    mockery.disable();
    mockery.deregisterMock('remote');
    mockery.deregisterMock('pods/template/components/Preview');
    mockery.deregisterMock('components/ExportPanel');
    errorStub.restore();
    done();
  });

  it('should pass propTypes check', () => {
    assert(!errorStub.called, `\n${errorStub.args.join('\n')}`);
  });

  it('should render a SideBar component', () => {
    let SideBar = findWithRef(render.output, 'SideBar');

    expect(SideBar).to.be.ok;
  });

  it('should render a PreviewArea component', () => {
    let PreviewArea = findWithRef(render.output, 'PreviewArea');

    expect(PreviewArea).to.be.ok;
  });
});