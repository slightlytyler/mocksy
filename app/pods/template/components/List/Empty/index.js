'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';


@Radium
export default class TemplateListEmpty extends Component {
  static propTypes = {
  };

  render() {
    const {
    } = this.props;

    return (
      <div style={styles.base}>Sorry, couldn't find any templates >:(</div>
    );
  }
}

const styles = {
  base: {
    position: 'absolute',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    fontSize: '1.5em',
    fontWeight: '200',
    textAlign: 'center',
    color: 'white'
  }
};