import { expect, assert } from 'chai';
import { stub } from 'sinon';
import React from 'react';
import sd from 'skin-deep';
import { isElementOfType } from 'react-addons-test-utils';;
import { findWithRef } from 'react-shallow-testutils';
import shallowRender from '../../../../../../test-utils/shallow-render';

const props = {
  screenshotWidth: 500,
  screenshotHeight: 1000
};

export default describe('PreviewForegroundEmpty', () => {
  let component,
      render,
      errorStub;

  before(done => {
    errorStub = stub(console, 'error');
    component = require('pods/template/components/Preview/Foreground/Empty');
    render = shallowRender(component, props);
    done();
  });

  after(done => {
    errorStub.restore();
    done();
  });

  it('should pass propTypes check', () => {
    assert(!errorStub.called, `\n${errorStub.args.join('\n')}`);
  });

  it('should display a prompt', () => {
    let prompt = findWithRef(render.output, 'prompt');

    expect(prompt.props.children).to.equal('Add a screenshot');
  });

  it('should display expected screenshot dimensions', () => {
    let dimensions = findWithRef(render.output, 'screenshotDimensions');

    expect(dimensions.props.children).to.equal(`( ${props.screenshotWidth} x ${props.screenshotHeight} )`);
  });
});