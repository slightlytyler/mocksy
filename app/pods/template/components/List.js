'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { map } from 'lodash';

import TemplateItem from './Item';

@Radium
export default class TemplateList extends Component {
  static propTypes = {
    templates: PropTypes.object.isRequired,
    currentTemplate: PropTypes.object.isRequired,
    setCurrentTemplate: PropTypes.func.isRequired,
  };

  render() {
    const {
      templates,
      currentTemplate,
      setCurrentTemplate
    } = this.props;

    return (
      <ul
        className="template-list"
        style={styles.base}
      >
        {map(templates, template => (
          <TemplateItem
            key={template.id}
            id={template.id}
            isActive={template.id === currentTemplate.id}
            activate={setCurrentTemplate}
          />
        ))}
      </ul>
    );
  }
}

const styles = {
  base: {
    flex: 1,
    overflow: 'scroll'
  }
};