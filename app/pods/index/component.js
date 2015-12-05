import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import fs from 'fs';
import path from 'path';

@Radium
export default class IndexComponent extends Component {
  test() {
    //var stats = fs.statSync("/pods/index/input.jpg");
    let stats = fs.lstatSync('./app/pods/index/input.jpg');
    console.log(stats.isFile());

    fs.writeFile('./app/pods/index/test.txt', 'Hello World!', function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
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
