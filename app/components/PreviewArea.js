'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import remote from 'remote';

@Radium
export default class PreviewArea extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      canvasDimensions: {
        width: 1,
        height: 1
      }
    };
  }

  handleResize() {
    const el = this.refs.preview;
    const style = window.getComputedStyle(el, null);

    const width = style.getPropertyValue('width').slice(0, -2),
          height = style.getPropertyValue('height').slice(0, -2),
          paddingLeft = style.getPropertyValue('padding-left').slice(0, -2),
          paddingTop = style.getPropertyValue('padding-top').slice(0, -2);

    const innerWidth = width - (paddingLeft * 2),
          innerHeight = height - (paddingTop * 2);

    this.setState({
      canvasDimensions: {
        width: innerWidth,
        height: innerHeight
      }
    });
  }

  componentDidMount() {
    const win = remote.getCurrentWindow();

    win.addListener('resize', this.handleResize.bind(this));
    this.handleResize(this.refs.preview)
  }

  componentWillUnmount() {
    const win = remote.getCurrentWindow();

    win.removeListener('resize', this.handleResize);
  }

  render() {
    const { canvasDimensions } = this.state

    return (
      <section
        ref="preview"
        className="preview"
        style={styles.base}
      >
        {React.cloneElement(this.props.children, { canvasDimensions })}
      </section>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 10,
    height: '100vh',
    padding: '7.5em',
  },
};