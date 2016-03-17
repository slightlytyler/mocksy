'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import update from 'react-addons-update';

import colors from 'constants/colors';
import BuilderLayout from 'layouts/Builder';
import SidebarContent from './SidebarContent';

@Radium
export default class TemplateEditor extends Component {
  static propTypes = {
    record: PropTypes.object.isRequired,
    updateForeground: PropTypes.func.isRequired,
  };

  state = {
    record: undefined,
    editingMode: 'marquee',
  };

  componentWillReceiveProps(props) {
    if (props.record && !this.state.record) {
      this.setState({ record: props.record });
    }
  }

  updateForegroundDimensions = dimensions => {
    console.log(dimensions);
    const updatedRecord = update(this.state.record, {
      dimensions: {
        foreground: {
          $set: Object.assign({}, this.state.record.dimensions.foreground, dimensions),
        },
      },
    });

    this.setState({ record: updatedRecord });
  };

  setEditingMode = mode => this.setState({ editingMode: mode });

  renderSidebar() {
    const { updateForegroundDimensions, setEditingMode } = this;
    const { record, editingMode } = this.state;

    if (record) {
      return (
        <SidebarContent
          foregroundDimensions={record.dimensions.foreground}
          updateForegroundDimensions={updateForegroundDimensions}
          editingMode={editingMode}
          setEditingMode={setEditingMode}
        />
      );
    }

    return undefined;
  }

  renderContent() {
    return (
      <span>Content</span>
    );
  }

  render() {
    return (
      <BuilderLayout
        SidebarContent={this.renderSidebar()}
        PreviewContent={this.renderContent()}
      />
    );
  }
}

const styles = {
};

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateNewTemplateForeground } from 'pods/templates/actions';

export default connect(
  state => ({
    record: state.present.templates.newRecord
  }),
  dispatch => bindActionCreators({
    updateForeground: updateNewTemplateForeground
  }, dispatch)
)(TemplateEditor);
