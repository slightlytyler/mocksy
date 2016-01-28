'use strict'

import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import Radium from 'radium';

@Radium
export default class TemplateBuilderForegroundContent extends Component {
  static propTypes = {
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    setTemplateForeground: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        foregroundWidth: '',
        foregroundHeight: '',
        foregroundLeft: '',
        foregroundTop: ''
      }
    };
  }

  updateForm(state, prop, value) {
    const newState = update(state, {
      form: {
        [prop]: { $set: value }
      }
    });

    this.setState(newState);
  }

  submit() {
    const { setTemplateForeground } = this.props;
    const {
      foregroundWidth,
      foregroundHeight,
      foregroundLeft,
      foregroundTop
    } = this.state.form;

    setTemplateForeground(
      foregroundWidth,
      foregroundHeight,
      foregroundLeft,
      foregroundTop
    );
  }

  render() {
    const {
      foregroundWidth,
      foregroundHeight,
      foregroundLeft,
      foregroundTop
    } = this.state.form;

    return (
      <div style={styles.form}>
        <div>
          <label>Foreground Width</label>
          <input
            value={foregroundWidth}
            onChange={e =>
              this.updateForm(this.state, 'foregroundWidth', e.target.value)
            }
          />
        </div>

        <div>
          <label>Foreground Height</label>
          <input
            value={foregroundHeight}
            onChange={e =>
              this.updateForm(this.state, 'foregroundHeight', e.target.value)
            }
          />
        </div>

        <div>
          <label>Foreground Left</label>
          <input
            value={foregroundLeft}
            onChange={e =>
              this.updateForm(this.state, 'foregroundLeft', e.target.value)
            }
          />
        </div>

        <div>
          <label>Foreground Top</label>
          <input
            value={foregroundTop}
            onChange={e =>
              this.updateForm(this.state, 'foregroundTop', e.target.value)
            }
          />
        </div>

        <button onClick={() => this.submit()}>
          Submit
        </button>
      </div>
    );
  }
}

const styles = {
};