'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import EmptyState from 'pods/template/foreground/empty/component';

@Radium
export default class TemplateForeground extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      screenshotURL: ""
    };
  }

  fileSelected(file) {
    var reader = new FileReader();

    reader.onload = (e) =>
        this.setState({ screenshotURL: e.target.result });

    reader.readAsDataURL(file);
  }

  render() {
    const { screenshotURL } = this.state
    return (
      <div
        className="foreground"
        style={[
          styles.base,
          {
            width: '88.4%',
            height: '75.7%',
            left: '5.8%',
            top: '12%'
          }
        ]}
      >
        {screenshotURL ?
          <img
            src={screenshotURL}
            style={styles.image}
          /> :
          <EmptyState
            fileSelected={(file) => this.fileSelected(file)}
          />
        }

      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#38B8E2'
  },

  image: {
    width: '100%',
    height: '100%'
  }
};