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
    record: PropTypes.object.isRequired,
    updateTemplateDetails: PropTypes.func.isRequired,
    setTemplateDetails: PropTypes.func.isRequired
  };


  render() {
    const {
      record,
      updateTemplateDetails,
      setTemplateDetails
    } = this.props;
    const {
      name
    } = record;

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
            <Field flexRatio={2}>
              <Input
                value={name}
                placeholder="Template Name"
                onChange={e =>
                  updateTemplateDetails({
                    name: e.target.value
                  })
                }
              />
            </Field>
          </Row>
        </ul>

         <Button
          onClick={() => setTemplateDetails()}
          fluid={true}
        >
          Save Template
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