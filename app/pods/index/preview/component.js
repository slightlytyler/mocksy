'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Template from 'pods/template/component';

@Radium
export default class IndexPreview extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    setCurrentScreenshot: PropTypes.func.isRequired
  };

  render() {
    const {
      template,
      screenshot,
      setCurrentScreenshot
    } = this.props;

    return (
      <section
        className="preview"
        style={styles.base}
      >
        <Template
          dimensions={template.dimensions}
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