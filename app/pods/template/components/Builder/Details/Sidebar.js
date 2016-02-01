'use strict'

import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import Radium from 'radium';

import Row from 'components/Form/Row';
import Field from 'components/Form/Field';
import Input from 'components/Form/Input';
import Button from 'components/Form/Button'

@Radium
export default class TemplateBuilderDetailsSidebar extends Component {
  static propTypes = {
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
      <div style={styles.base}>
        <ul
          ref="options"
          style={styles.options.base}
        >
          <Row
            ref="name"
            isLastRow={true}
          >
            <label style={styles.options.item.label}>Name</label>
            <Field >
              <Input
                value={name}
                placeholder="Template Name"
                onChange={e =>
                  this.updateForm(this.state, 'name', e.target.value)
                }
              />
            </Field>
          </Row>
        </ul>

         <Button
          onClick={() => this.submit()}
          fluid={true}
        >
          Next Step
        </Button>
      </div>
    );
  }
}

const styles = {
  base: {
    marginTop: '2em',
    padding: '0 1em',
  },

  options: {
    base: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '2em'
    },

    item: {
      base: {
        display: 'flex'
      },

      label: {
        flex: 1,
        color: 'white'
      },

      button: {
        flex: 1
      }
    }
  }
};