'use strict'

import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import Radium from 'radium';

import colors from 'constants/colors';
import Row from 'components/Form/Row';
import Field from 'components/Form/Field';
import Input from 'components/Form/Input';
import Button from 'components/Form/Button'

@Radium
export default class TemplateBuilderForegroundSidebar extends Component {
  static propTypes = {
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
      foregroundLeft,
      foregroundTop,
      foregroundWidth,
      foregroundHeight,
    } = this.state.form;

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
                value={foregroundLeft}
                placeholder="0"
                onChange={e =>
                  this.updateForm(this.state, 'foregroundLeft', e.target.value)
                }
              />
            </Field>
            <Field
              label="Y"
              labelColor="white"
            >
              <Input
                value={foregroundTop}
                placeholder="0"
                onChange={e =>
                  this.updateForm(this.state, 'foregroundTop', e.target.value)
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
              <Input
                value={foregroundWidth}
                placeholder="0"
                onChange={e =>
                  this.updateForm(this.state, 'foregroundWidth', e.target.value)
                }
              />
            </Field>
            <Field
              label="Height"
              labelColor="white"
            >
              <Input
                value={foregroundHeight}
                placeholder="0"
                onChange={e =>
                  this.updateForm(this.state, 'foregroundHeight', e.target.value)
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