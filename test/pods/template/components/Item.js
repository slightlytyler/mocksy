import { expect, assert } from 'chai';
import { stub, spy } from 'sinon';
import React from 'react';
import { findWithRef } from 'react-shallow-testutils';
import shallowRender from '../../../utils/shallow-render';

import TemplateItem from 'pods/template/components/Item';
import { iPhone_6 } from 'constants/base-templates';

const actions = {
  activate: spy()
};
const props = {
  id: iPhone_6.id,
  isActive: false,
  ...actions
};
const activeProps = Object.assign({}, props, {
  isActive: true
});

export default describe('Item', () => {
  let errorStub;
  const render = shallowRender(TemplateItem, props);
  const activeRender = shallowRender(TemplateItem, activeProps);

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

  it('should display the correct thumbnail image', () => {
    const thumbnail = findWithRef(render.output, 'thumbnail');
    const path = thumbnail.props.src;

    expect(path).to.equal(`assets/base-templates/${props.id}/thumbnail.png`);
  });

  it('should display the correct name', () => {
    const name = findWithRef(render.output, 'name');
    const text = name.props.children;

    expect(text).to.equal('iPhone 6');
  });

  it('should call activate onClick if not the current active template', () => {
    let action = actions.activate;

    render.output.props.onClick();
    expect(action.called).to.be.true;
    action.reset();

    activeRender.output.props.onClick();
    expect(action.called).to.be.false;
    action.reset();
  });
});