import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import fs from 'fs';
import gm from 'gm';

import SideBar from './side-bar/component';
import Preview from './preview/component';

@Radium
export default class Index extends Component {
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

  handleFile(event) {
    this.test(event.target.files[0].path);
  }

  render() {
    return (
      <div
        className="index"
        style={styles.base}
      >
        <SideBar />
        <Preview />
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
