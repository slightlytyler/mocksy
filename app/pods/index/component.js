import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

@Radium
export default class IndexComponent extends Component {
  render() {
    return (
      <div>
        <div style={styles.container}>
          <h2 style={styles.header}>Home</h2>
          <Link
            to="/counter"
            style={styles.link}
          >
            to Counter
          </Link>
        </div>
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
