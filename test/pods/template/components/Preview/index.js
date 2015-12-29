import { expect, assert } from 'chai';
import { stub } from 'sinon';
import React from 'react';
import sd from 'skin-deep';
import { isElementOfType } from 'react-addons-test-utils';
import mockery from 'mockery';
import { findWithRef } from 'react-shallow-testutils';
import remoteMock from '../../../../utils/remote-mock';
import shallowRender from '../../../../utils/shallow-render';

const actions = {
  setCurrentScreenshot: () => true
};
const props = {
  id: 'Test_Template',
  dimensions: {
    width: 999,
    height: 1000,

    foreground: {
      width: 500,
      height: 1000,
      left: 10,
      top: 20
    }
  },
  canvasDimensions: {
    width: 1000,
    height: 1000
  },
  screenshot: '/path/to/screenshot.jpg',
  ...actions
};
const higherAspectProps = Object.assign({}, props, {
  canvasDimensions: {
    width: 998,
    height: 1000
  }
});

export default describe('Preview', () => {
  let component,
      render,
      higherAspectRender,
      errorStub;

  before(done => {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerMock('remote', remoteMock);
    errorStub = stub(console, 'error');
    component = require('pods/template/components/Preview');
    render = shallowRender(component, props);
    higherAspectRender = shallowRender(component, higherAspectProps);
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

  it('should render proper background image', () => {
    let background = findWithRef(render.output, 'background');

    expect(background.props.src).to.equal(`assets/base-templates/${props.id.toLowerCase()}/template.png`)
  });

  it('should render TemplatePreviewForeground component', () => {
    let Foreground = findWithRef(render.output, 'background');

    expect(Foreground).to.be.ok;
  });

  it('isHigherAspect should return true if props.dimensions ratio is greater than or equal to props.canvasDimensions', () => {
    let isHigherAspect = render.instance.isHigherAspect;
    let { dimensions, canvasDimensions } = props;

    expect(isHigherAspect(dimensions, canvasDimensions)).to.be.false;
    expect(
      isHigherAspect({
        width: 1000,
        height: 1000
      },
      canvasDimensions
    )).to.be.true;
    expect(
      isHigherAspect({
        width: 1001,
        height: 1000
      },
      canvasDimensions
    )).to.be.true;
  });

  it('should have 100% width if isHigherAspect', () => {
    expect(higherAspectRender.output.props.style.width).to.equal('100%');
  });

  it('should have 100% height if not isHigherAspect', () => {
    expect(render.output.props.style.height).to.equal('100%');
  });
});