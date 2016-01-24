'use strict'

import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import Radium from 'radium';
import { Link } from 'react-router'
import { dialog } from 'remote';

import gm from 'api/gm';
import acceptedImageFormats from 'constants/accepted-image-formats';

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
          <div>
            <label>Name</label>
            <input value={name} onChange={e => this.updateForm(this.state, 'name', e.target.value)} />
          </div>

          <div>
            <label>Background</label>
            <div onClick={() => this.openFile()}>Pick File</div>
          </div>

          <div>
            <label>Foreground Width</label>
            <input value={foregroundWidth} onChange={e => this.updateForm(this.state, 'foregroundWidth', e.target.value)} />
          </div>

          <div>
            <label>Foreground Height</label>
            <input value={foregroundHeight} onChange={e => this.updateForm(this.state, 'foregroundHeight', e.target.value)} />
          </div>

          <div>
            <label>Foreground Left</label>
            <input value={foregroundLeft} onChange={e => this.updateForm(this.state, 'foregroundLeft', e.target.value)} />
          </div>

          <div>
            <label>Foreground Top</label>
            <input value={foregroundTop} onChange={e => this.updateForm(this.state, 'foregroundTop', e.target.value)} />
          </div>

          <button onClick={() => addTemplate(this.state.form)}>Submit</button>
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