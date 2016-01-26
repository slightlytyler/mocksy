'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import remote from 'remote';

import TemplatePreview from 'pods/template/components/Preview';

@Radium
export default class MockupBuilderPreviewArea extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    setCurrentScreenshot: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      canvasDimensions: {
        width: 1,
        height: 1
      }
    }
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
    const {
      template,
      screenshot,
      setCurrentScreenshot
    } = this.props;
    const { canvasDimensions } = this.state

    return (
      <section
        ref="preview"
        className="preview"
        style={styles.base}
      >
        <TemplatePreview
          { ...template }
          canvasDimensions={canvasDimensions}
          screenshot={screenshot}
          setCurrentScreenshot={setCurrentScreenshot}
        />
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