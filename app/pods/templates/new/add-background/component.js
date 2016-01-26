'use strict'

import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import Radium from 'radium';
import { Link } from 'react-router'
import { dialog } from 'remote';

import gm from 'api/gm';
import acceptedImageFormats from 'constants/accepted-image-formats';
import Sidebar from 'components/Sidebar';
import PreviewArea from 'components/PreviewArea';

@Radium
export default class TemplatesNew extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: '',
        backgroundPath: '',
        foregroundWidth: '',
        foregroundHeight: '',
        foregroundLeft: '',
        foregroundTop: ''
      }
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
              this.updateForm(this.state, 'backgroundPath', path)
            }
            else {
              alert(`Mocksy doesn't currently support that ):`);
            }
          }
        });
      }
    });
  }

  updateForm(state, prop, value) {
    const newState = update(state, {
      form: {
        [prop]: { $set: value }
      }
    });

    this.setState(newState);
  }

  render() {
    const {
      addTemplate
    } = this.props.actions;
    const {
      name,
      backgroundPath,
      foregroundWidth,
      foregroundHeight,
      foregroundLeft,
      foregroundTop
    } = this.state.form;

    return (
      <div style={styles.base}>
        <Sidebar>
          <header style={styles.header}>
             <Link
              to="/"
              style={styles.link}
            >
              Back
            </Link>
            Add Background
          </header>
        </Sidebar>

        <PreviewArea>
          <div>
            <label>Background</label>
            <div onClick={() => this.openFile()}>Pick File</div>
          </div>
        </PreviewArea>
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex'
  },

  header: {
    display: 'flex'
  }
};