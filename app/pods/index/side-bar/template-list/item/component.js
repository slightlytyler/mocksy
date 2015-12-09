'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class IndexSideBarTemplateListItem extends Component {
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
    borderBottom: '1px solid #EDF3F5',
    cursor: 'pointer',
    color: '#607D8B'
  },

  active: {
    backgroundColor: '#607D8B',
    color: '#CFD8DC'
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
      flex: 2
    },

    text: {
      fontSize: '2em',
      fontWeight: 100,
    }
  }
};