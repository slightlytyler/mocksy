'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import listensToClickOutside from 'react-onclickoutside/decorator';
import { map, reduce } from 'lodash';

@listensToClickOutside
@Radium
export default class Dropdown extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      label: PropTypes.string
    })).isRequired,
    onChange: PropTypes.func
  };

  toggleActive() {
    const { isActive } = this.state;

    this.setState({
      isActive: !isActive
    });
  }

  handleClickOutside() {
    this.setState({
      isActive: false
    });
  }

  selectOption(val) {
    const {
      value,
      onChange
    } = this.props;
    if (val !== value) onChange(val);
  }

  currentOption() {
    const { value, options } = this.props;
    return reduce(options, (a, b) =>
      b.value === value ? b : a
    )
  }

  render() {
    const {
      name,
      value,
      options,
      editable,
      onChange,
      baseStyle
    } = this.props;
    const { isActive } = this.state;
    const currentOption = this.currentOption();

    return (
      <div
        onClick={() => !editable && this.toggleActive()}
        className="dropdown"
        style={[
          styles.base,
          baseStyle
        ]}
      >
        <section
          className="placeholder"
          style={[
            styles.placeholder.base,
            isActive && styles.placeholder.active,
          ]}
        >
          {editable ?
            (
              <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={[
                  styles.placeholder.text,
                  styles.placeholder.input
                ]}
              />
            ) :
            (
              <div
                style={styles.placeholder.text}
              >
                {currentOption.label}
              </div>
            )
          }
          <div
            onClick={() => editable && this.toggleActive()}
            style={styles.placeholder.arrow}
          >
            <span style={styles.placeholder.icon}>&rsaquo;</span>
          </div>
        </section>
        <ul
          onClick={() => editable && this.toggleActive()}
          className="menu"
          style={[
            styles.menu.base,
            isActive && styles.menu.visible
          ]}
        >
          {map(options, (option, i) =>(
            <li
              key={`${name}-option:${option.value}`}
              onClick={() => this.selectOption(option.value)}
              style={[
                styles.menu.item,
                (options.length === i +1) && {
                  borderBottom: 'none'
                }
              ]}
            >
              <span style={styles.menu.text}>
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    lineHeight: 'normal',
    backgroundColor: 'white',
    cursor: 'pointer',

    ':focus': {
      outline: '-webkit-focus-ring-color auto 5px'
    }
  },

  placeholder: {
    base: {
      display: 'flex'
    },

    active: {
      outline: '-webkit-focus-ring-color auto 5px'
    },

    text: {
      flex: 1,
      padding: '1px 1px 1px .25em',
    },

    input: {
      width: '0',
      fontSize: '1em',
      border: 'none',
      outline: 'none'
    },

    arrow: {
      position: 'relative',
      width: '1.5em',
      overflow: 'hidden',
      backgroundColor: '#CFD8DC',
    },

    icon: {
      position: 'absolute',
      left: 'calc(50% + .1em)',
      top: 'calc(50% + .03em)',
      transform: 'translate(-50%, -50%) rotate(90deg)',
      fontSize: '2em',
      fontWeight: 'bold',
      lineHeight: 1,
      color: 'white'
    }
  },

  menu: {
    base: {
      display: 'none',
      position: 'absolute',
      left: '-1px',
      bottom: '100%',
      width: 'calc(100%  + 2px)',
      backgroundColor: 'white',
      border: '1px solid #CFD8DC',
    },

    visible: {
      display: 'block',
    },

    item: {
      borderBottom: '1px solid #EDF3F5',

      ':hover': {
        backgroundColor: '#607D8B',
        color: 'white'
      }
    },

    text: {
      display: 'block',
      padding: '.25em',
    },
  },
};