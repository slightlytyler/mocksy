import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import fs from 'fs';
import gm from 'gm';

@Radium
export default class IndexComponent extends Component {
  test() {
    //var stats = fs.statSync("/pods/index/input.jpg");
    let stats = fs.lstatSync('./app/pods/index/input.jpg');
    console.log(stats.isFile());

    gm('./app/pods/index/input.jpg')
      .resizeExact(240, 240)
      .write('./app/pods/index/output.jpg', function (err) {
        if (!err) console.log('done');
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
