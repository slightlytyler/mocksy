import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import SideBar from './components/SideBar';
import PreviewArea from './components/PreviewArea';

@Radium
export default class Index extends Component {
  static propTypes = {
    templates: PropTypes.object.isRequired,
    currentTemplate: PropTypes.object.isRequired,
    currentScreenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      setCurrentScreenshot: PropTypes.func.isRequired,
      addSize: PropTypes.func.isRequired,
      removeSize: PropTypes.func.isRequired,
      updateSize: PropTypes.func.isRequired
    })
  };

  render() {
    const {
      templates,
      currentTemplate,
      currentScreenshot,
      sizes,
      actions
    } = this.props;
    const {
      setCurrentTemplate,
      setCurrentScreenshot,
      addSize,
      removeSize,
      updateSize
    } = actions;

    return (
      <div
        className="index"
        style={styles.base}
      >
        <SideBar
          templates={templates}
          setCurrentTemplate={setCurrentTemplate}
          currentTemplate={currentTemplate}
          screenshot={currentScreenshot}
          sizes={sizes}
          addSize={addSize}
          removeSize={removeSize}
          updateSize={updateSize}
        />
        <PreviewArea
          template={currentTemplate}
          screenshot={currentScreenshot}
          setCurrentScreenshot={setCurrentScreenshot}
        />
      </div>
    );
  }
}

const styles={
  base: {
    display: 'flex',
    overflow: 'hidden'
  },
}
