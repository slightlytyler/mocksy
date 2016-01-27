'use strict'

import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import Radium from 'radium';

@Radium
export default class TemplatesNewAddDetails extends Component {
  static propTypes = {
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
    const {
      id,
      actions
    } = this.props;
    const {
      updateTemplate,
      transitionTo
    } = this.props.actions;
    const {
      name
    } = this.state.form;

    updateTemplate(id, {
      name
    });

    transitionTo(`/templates/user`);
  }

  render() {
    const { name } = this.state.form;

    return (
      <div style={styles.form}>
        <div>
          <label>Name</label>
          <input value={name} onChange={e => this.updateForm(this.state, 'name', e.target.value)} />
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