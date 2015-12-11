'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import TemplatePreview from 'pods/template/components/Preview';

@Radium
export default class IndexPreviewArea extends Component {
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

  handleResize(el) {
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
    window.addEventListener('resize', this.handleResize(this.refs.preview));
    this.handleResize(this.refs.preview)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
          id={template.id}
          dimensions={template.dimensions}
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