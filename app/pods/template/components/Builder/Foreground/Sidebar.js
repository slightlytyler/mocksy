'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import Row from 'components/Form/Row';
import Field from 'components/Form/Field';
import Input from 'components/Form/Input';
import Button from 'components/Form/Button'

@Radium
export default class TemplateBuilderForegroundSidebar extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div style={styles.base}>
        <ul
          ref="options"
          style={styles.options.base}
        >
          <Row
            ref="mode"
            isLastRow={false}
          >
            <label style={styles.options.item.label}>Mode</label>
            <div style={{flex: 1, marginRight: '1.5em'}}>
              <Button
                fluid={true}
                active={true}
              >
                Marquee
              </Button>
            </div>
            <div style={{flex: 1}}>
              <Button fluid={true}>Free</Button>
            </div>
          </Row>

          <Row
            ref="position"
            isLastRow={false}
          >
            <label style={styles.options.item.label}>Position</label>
            <Field
              label="X"
              labelColor="white"
            >
              <Input
                value={undefined}
                placeholder="0"
                onChange={() => console.log('test')}
              />
            </Field>
            <Field
              label="Y"
              labelColor="white"
            >
              <Input
                value={undefined}
                placeholder="0"
                onChange={() => console.log('test')}
              />
            </Field>
          </Row>

          <Row
            ref="size"
            isLastRow={true}
          >
            <label style={styles.options.item.label}>Size</label>
            <Field
              label="Width"
              labelColor="white"
            >
              <Input
                value={undefined}
                placeholder="0"
                onChange={() => console.log('test')}
              />
            </Field>
            <Field
              label="Height"
              labelColor="white"
            >
              <Input
                value={undefined}
                placeholder="0"
                onChange={() => console.log('test')}
              />
            </Field>
          </Row>
        </ul>

        <Button
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