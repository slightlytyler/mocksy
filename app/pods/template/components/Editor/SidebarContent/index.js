'use strict'

import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import Radium from 'radium';

import colors from 'constants/colors';
import Row from 'components/Form/Row';
import Field from 'components/Form/Field';
import InputNumber from 'components/Form/Input/Number';
import Button from 'components/Form/Button';
import marqueeIcon from './assets/marquee-icon.svg';
import navigateIcon from './assets/navigate-icon.svg';
import Icon from 'react-svgcon';

@Radium
export default class TemplateEditorSidebar extends Component {
  static propTypes = {
    foregroundDimensions: PropTypes.object,
    updateForegroundDimensions: PropTypes.func,
    editingMode: PropTypes.oneOf(['marquee', 'move']),
    setEditingMode: PropTypes.func,
  };

  render() {
    const {
      foregroundDimensions,
      updateForegroundDimensions,
      editingMode,
      setEditingMode,
    } = this.props;
    const {
      x,
      y,
      width,
      height
    } = foregroundDimensions;

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
                active={editingMode === 'marquee'}
                fluid={true}
                onClick={() => setEditingMode('marquee')}
                color={colors.white}
                altColor={colors.pink}
              >
                <Icon
                  path={marqueeIcon}
                  width="1.5em"
                  color="currentColor"
                  style={{
                    color: 'currentColor'
                  }}
                />
              </Button>
            </div>
            <div style={{flex: 1}}>
              <Button
                fluid={true}
                active={editingMode === 'move'}
                onClick={() => setEditingMode('move')}
                color={colors.white}
                altColor={colors.pink}
              >
                <Icon
                  path={navigateIcon}
                  width="1.5em"
                  color="currentColor"
                />
              </Button>
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
                value={x}
                placeholder="0"
                handleChange={val =>
                  updateForegroundDimensions({
                    x: val
                  })
                }
              />
            </Field>
            <Field
              label="Y"
              labelColor="white"
            >
              <InputNumber
                value={y}
                placeholder="0"
                handleChange={val =>
                  updateForegroundDimensions({
                    y: val
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
                  updateForegroundDimensions({
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
                  updateForegroundDimensions({
                    height: val
                  })
                }
              />
            </Field>
          </Row>
        </ul>

        <Button
          onClick={() => console.log('test')}
          fluid={true}
          color={colors.white}
          altColor={colors.pink}
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