'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { map, size } from 'lodash';

import TemplateItem from '../Item';
import TemplateListEmpty from './Empty'

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
    const hasTemplates = size(templates) !== 0;

    return (
      <ul
        className="template-list"
        style={styles.base}
      >
        { hasTemplates ?
          map(templates, template => (
            <TemplateItem
              key={template.id}
              id={template.id}
              isActive={template.id === currentTemplate.id}
              activate={setCurrentTemplate}
            />
          )) :
          <TemplateListEmpty />
        }
      </ul>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    flex: 1,
    overflow: 'scroll'
  }
};