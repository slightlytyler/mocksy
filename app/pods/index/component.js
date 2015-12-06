import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import fs from 'fs';
import gm from 'gm';

import FileInput from 'react-file-input';

@Radium
export default class IndexComponent extends Component {
  test(path) {
    console.log(process.cwd());
    let stats = fs.lstatSync(path);
    console.log(stats.isFile());
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
    console.log(event.target.files[0]);
    this.test(event.target.files[0].path);
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>Index</h1>

        <span onClick={this.test}>Click Me</span>

        <FileInput name="screenshot"
                   placeholder="Select Screenshot"
                   onChange={(e) => this.handleFile(e)} />
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
