'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';

@Radium
export default class TemplateItem extends Component {
  static propTypes = {
    templateId: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    activate: PropTypes.func.isRequired
  };

  render() {
    const {
      templateId,
      isActive,
      activate
    } = this.props;

    return (
      <li
        onClick={() => !isActive && activate(templateId)}
        style={[
          styles.base,
          isActive && styles.active
        ]}
      >
        <div style={styles.preview.container}>
          <img
            src={`assets/base-templates/${templateId}/thumbnail.png`}
            style={styles.preview.image}
          />
        </div>

        <div style={styles.name.container}>
          <span style={styles.name.text}>
            {templateId.split('-').join(' ')}
          </span>
        </div>
      </li>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    height: '15vh',
    borderBottom: `1px solid white`,
    cursor: 'pointer',
    color: 'white',
    borderRightWidth: '1.5em',
    borderRightStyle: 'solid',
    borderRightColor: 'transparent',

    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },

  active: {
    borderRightColor: 'white'
  },

  preview: {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      padding: '1em'
    },

    image: {
      maxWidth: '100%',
      maxHeight: '10vh'
    }
  },

  name: {
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 2,
    },

    text: {
      marginRight: '1em',
      fontSize: '1.6em',
      fontWeight: 200,

    }
  }
};