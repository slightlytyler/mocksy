import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import fs from 'fs';
import gm from 'gm';

import SideBar from './side-bar/component';
import Preview from './preview/component';

@Radium
export default class Index extends Component {
  static propTypes = {
    templates: PropTypes.object.isRequired,
    currentTemplate: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      setCurrentScreenshot: PropTypes.func.isRequired
    })
  };

  test(path) {
    gm()
    .in('-page', '+0+0')
    .in('./app/pods/index/input.png')
    .in('-geometry','420x748')
    .in('-page', '+28+117')
    .in(path)
    .mosaic()
    .write('./app/pods/index/output.png', function(err) {
      if(!err) console.log("Written composite image.");
    });
  }

  render() {
    const {
      templates,
      currentTemplate,
      currentScreenshot,
      actions
    } = this.props;
    const { setCurrentScreenshot } = actions;

    return (
      <div
        className="index"
        style={styles.base}
      >
        <SideBar
          templates={templates}
        />
        <Preview
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
