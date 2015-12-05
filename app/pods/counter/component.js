import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

@Radium
export default class CounterComponent extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  };

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div>
        <div style={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div style={styles.counter}>
          {counter}
        </div>
        <div style={styles.btnGroup}>
          <button
            ref="incrementButton"
            onClick={increment}
            style={styles.btn}
          >
            <i className="fa fa-plus"></i>
          </button>
          <button
            ref="reduceButton"
            onClick={decrement}
            style={styles.btn}
          >
            <i className="fa fa-minus"></i>
          </button>
          <button
            ref="oddButton"
            onClick={incrementIfOdd}
            style={styles.btn}
          >
            odd
          </button>
          <button
            ref="asyncButton"
            style={styles.btn}
            onClick={() => incrementAsync()}
          >
            async
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  backButton: {
    position: 'absoulte'
  },

  counter: {
    position: 'absoulte',
    top: '30%',
    left: '45%',
    fontSize: '10rem',
    fontWeight: 'bold',
    letterSpacing: '-.025em'
  },

  btnGroup: {
    position: 'relative',
    width: '480px',
    margin: '0 auto'
  },

  btn: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: '50%',
    margin: '10px',
    width: '100px',
    height: '100px',
    opacity: '.7',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, Helvetica Neue',

    ':hover': {
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
  },

}
