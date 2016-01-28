'use strict'

import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import Radium from 'radium';

@Radium
export default class TemplateBuilderDetailsContent extends Component {
  static propTypes = {
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    setTemplateDetails: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: ''
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
    const { setTemplateDetails } = this.props;
    const { name } = this.state.form;

    setTemplateDetails({
      name
    });
  }

  render() {
    const { name } = this.state.form;

    return (
      <div style={styles.form}>
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={e =>
              this.updateForm(this.state, 'name', e.target.value)
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