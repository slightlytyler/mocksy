'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router'
import { dialog } from 'remote';

import gm from 'api/gm';

@Radium
export default class TemplatesNew extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      backgroundPath: '',
      foregroundWidth: '',
      foregroundHeight: '',
      foregroundLeft: '',
      foregroundTop: ''
    };
  }

  openFile() {
    dialog.showOpenDialog({ multiSelections: false }, fileNames => {
      if (fileNames) {
        let path = fileNames[0];

        gm(path).identify((err, value) => {
          if (err) {
            alert('The file you selected is not recognized as an image.')
          } else {
            let selectedFileFormat = value.format.toLowerCase();
            let isAccepted = acceptedImageFormats.some(format =>
              selectedFileFormat === format.value || selectedFileFormat === format.alias
            );

            if (isAccepted) {
              this.setState({ backgroundPath: path });
            } else {
              alert(`Mocksy doesn't currently support that ):`);
            }
          }
        });
      }
    });
  }

  render() {
    const {
    } = this.props;
    let {
      name,
      backgroundPath,
      foregroundWidth,
      foregroundHeight,
      foregroundLeft,
      foregroundTop
    } = this.state;

    return (
      <div style={styles.base}>
        <header style={styles.header}>
          New Template
           <Link
            to="/"
            style={styles.link}
          >
            Index
          </Link>
        </header>

        <form style={styles.form}>
          <input value={name} onChange={e => this.setState({ name: e.value })} />
          <div onClick={() => this.openFile()}>Pick File</div>
          <input value={foregroundWidth} onChange={e => this.setState({ foregroundWidth: e.value })} />
          <input value={foregroundHeight} onChange={e => this.setState({ foregroundHeight: e.value })} />
          <input value={foregroundLeft} onChange={e => this.setState({ foregroundLeft: e.value })} />
          <input value={foregroundTop} onChange={e => this.setState({ foregroundTop: e.value })} />
        </form>
      </div>
    );
  }
}

const styles = {
  header: {
    display: 'flex'
  }
};