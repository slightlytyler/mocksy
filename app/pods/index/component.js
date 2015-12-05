import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import fs from 'fs';
import gm from 'gm';

@Radium
export default class IndexComponent extends Component {
  test() {
    const baseImage = gm('./app/pods/index/input.jpg');
    const overlayImage = gm('./app/pods/index/overlay.png').geometry(100, 100);

    gm()
    .in('-page', '+0+0')
    .in('./app/pods/index/input.png')
    .in('-geometry','420x748')
    .in('-page', '+28+117')
    .in('./app/pods/index/overlay.png')
    .mosaic()
    .write('./app/pods/index/output.png', function(err) {
      if(!err) console.log("Written composite image.");
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>Index</h1>

        <span onClick={() => this.test()}>Click Me</span>
      </div>
    );
  }
}

const styles={
  container: {
    position: 'absolute',
    top: '30%',
    left: '10px',
    textAlign: 'center'
  },

  header: {
    fontSize: '5rem'
  },

  link: {
    fontSize: '1.4rem'
  }
}
