'use strict'

import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import Radium from 'radium';

import colors from 'constants/colors';
import Row from 'components/Form/Row';
import Field from 'components/Form/Field';
import InputNumber from 'components/Form/Input/Number';
import Button from 'components/Form/Button'

@Radium
export default class TemplateBuilderForegroundSidebar extends Component {
  static propTypes = {
    record: PropTypes.object.isRequired,
    updateTemplateForeground: PropTypes.func.isRequired,
    setTemplateForeground: PropTypes.func.isRequired
  };

  render() {
    const {
      record,
      updateTemplateForeground,
      setTemplateForeground
    } = this.props;
    const {
      left,
      top,
      width,
      height
    } = record.dimensions.foreground;

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
              <InputNumber
                value={left}
                placeholder="0"
                handleChange={val =>
                  updateTemplateForeground({
                    left: val
                  })
                }
              />
            </Field>
            <Field
              label="Y"
              labelColor="white"
            >
              <InputNumber
                value={top}
                placeholder="0"
                handleChange={val =>
                  updateTemplateForeground({
                    top: val
                  })
                }
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
              <InputNumber
                value={width}
                placeholder="0"
                handleChange={val =>
                  updateTemplateForeground({
                    width: val
                  })
                }
              />
            </Field>
            <Field
              label="Height"
              labelColor="white"
            >
              <InputNumber
                value={height}
                placeholder="0"
                handleChange={val =>
                  updateTemplateForeground({
                    height: val
                  })
                }
              />
            </Field>
          </Row>
        </ul>

        <Button
          onClick={() => setTemplateForeground()}
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