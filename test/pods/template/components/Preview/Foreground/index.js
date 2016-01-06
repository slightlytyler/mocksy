import { expect, assert } from 'chai';
import { stub, spy } from 'sinon';
import React from 'react';
import { isElementOfType } from 'react-addons-test-utils';
import mockery from 'mockery';
import { findWithRef } from 'react-shallow-testutils';
import remoteMock from '../../../../../test-utils/remote-mock';
import shallowRender from '../../../../../test-utils/shallow-render';

import { iPhone_6 } from 'constants/base-templates';

const actions = {
  setCurrentScreenshot: spy()
};
const props = {
 screenshot: 'path/to/screenshot',
 foregroundDimensions: {
  width: 500,
  height: 1000,
  left: 10,
  top: 20
 },
 containerDimensions: {
  width: 1000,
  height: 1000
 },
  ...actions
};
const emptyProps = Object.assign({}, props, {
  screenshot: null
});

export default describe('PreviewForeground', () => {
  let component,
      render,
      emptyRender,
      errorStub;

  before(done => {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerMock('remote', remoteMock);
    errorStub = stub(console, 'error');
    component = require('pods/template/components/Preview/Foreground');
    render = shallowRender(component, props);
    emptyRender = shallowRender(component, emptyProps);
    done();
  });

  after(done => {
    mockery.disable();
    mockery.deregisterMock('remote');
    errorStub.restore();
    done();
  });

  it('should pass propTypes check', () => {
    assert(!errorStub.called, `\n${errorStub.args.join('\n')}`);
  });

  it('should render with the correct dimensions', () => {
    let {
      width,
      height,
      left,
      top
    } = render.output.props.style;

    expect(width).to.equal('calc(50% + 2px)');
    expect(height).to.equal('calc(100% + 2px)');
    expect(left).to.equal('calc(1% - 1px)');
    expect(top).to.equal('calc(2% - 1px)');
  });

  it('should render a screenshot if props.screenshot is present', () => {
    let screenshot = findWithRef(render.output, 'screenshot');

    expect(screenshot.props.src).to.equal(props.screenshot);
  });

  it('should render an Empty component if props.screenshot is null', () => {
    let Empty = findWithRef(emptyRender.output, 'empty');

    expect(Empty).to.be.ok;
  });

  it('should call openFile onClick', () => {
    let openFile = spy(render.instance, 'openFile');

    render.output.props.onClick();

    expect(openFile.called).to.be.true;
    openFile.reset();
  });

  it('should show an open dialog and call setCurrentScreenshot with the result when openFile is called', () => {
    let dialog = spy(remoteMock.dialog, 'showOpenDialog');
    let action = actions.setCurrentScreenshot;

    render.instance.openFile();

    expect(dialog.called).to.be.true;
    dialog.reset();

    expect(action.called).to.be.true;
    expect(action.args[0][0]).to.equal('path/to/file');
    action.reset();
  });
});