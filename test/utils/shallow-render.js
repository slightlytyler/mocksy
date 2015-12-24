import React from 'react';
import sd from 'skin-deep';

// Saves on boiler plate
export default function shallowRender(Component, props) {
  const tree = sd.shallowRender(React.createElement(Component, props));
  const instance = tree.getMountedInstance();
  const output = tree.getRenderOutput();
  const children = output.props.children;

  return {
    props,
    tree,
    instance,
    output,
    children
  };
}