'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import listensToClickOutside from 'react-onclickoutside/decorator';
import { map, reduce } from 'lodash';

import colors from 'constants/colors';

@listensToClickOutside
@Radium
export default class FormDropdown extends Component {
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
      key,
      name,
      value,
      options,
      editable,
      onChange
    } = this.props;
    const { isActive } = this.state;
    const currentOption = this.currentOption();

    return (
      <div
        onClick={() => !editable && this.toggleActive()}
        className={`dropdown ${name}`}
        style={[
          styles.base,
          !editable && styles.notEditable,
          isActive && styles.active
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
                className={`input ${name}`}
                style={[
                  styles.placeholder.text,
                  styles.placeholder.input
                ]}
              />
            ) :
            (
              <div
                className="placeholder text"
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
              key={`${key}-option:${option.value}`}
              onClick={() => this.selectOption(option.value)}
              className="item"
              style={[
                styles.menu.item,
                (options.length === i + 1) && {
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
    width: '100%',
    marginBottom: '.3em',
    fontSize: '.9em',
    lineHeight: 'normal',
    color: colors.black,
    backgroundColor: 'white',
     border: `1px solid ${colors.pink}`,
    cursor: 'pointer',

    ':focus': {
      outline: '-webkit-focus-ring-color auto 5px'
    }
  },

  notEditable: {
    borderTopLeftRadius: '.4em',
    borderBottomLeftRadius: '.4em'
  },

  active: {
    borderTopLeftRadius: '0',
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
      backgroundColor: colors.pink,
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
      border: `1px solid ${colors.pink}`,
    },

    visible: {
      display: 'block',
    },

    item: {
      borderBottom: `1px solid ${colors.grey}`,

      ':hover': {
        color: colors.orange,
      }
    },

    text: {
      display: 'block',
      padding: '.25em',
    },
  },
};