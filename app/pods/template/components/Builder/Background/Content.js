'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import openFile from 'api/open-file';
import colors from 'constants/colors';
import TemplatePreview from 'pods/template/components/Preview';
import wireframe from './assets/wireframe.svg';
import Prompt from 'components/Prompt';
import Spinner from 'components/Spinner';

@Radium
export default class TemplateBuilderBackgroundContent extends Component {
  static propTypes = {
    setTemplateBackground: PropTypes.func,
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  render() {
    const {
      setTemplateBackground,
      canvasDimensions
    } = this.props;
    const { loading } = this.state

    return (
      <TemplatePreview
        dimensions={{
          width: 255,
          height: 512,

          foreground: {
            width: 204,
            height: 372,
            left: 25,
            top: 70
          }
        }}
        canvasDimensions={{
          width: canvasDimensions.width,
          height: canvasDimensions.height
        }}
        backgroundPath={wireframe}
      >
        <div
          onClick={() => !loading && openFile(
            path => setTemplateBackground(
              path,
              () => this.setState({
                loading: true
              })
            )
          )}
          style={[
            styles.container.base,
            loading && styles.container.disabled
          ]}
        >
          {
            loading
            ? (
              <Spinner color={colors.pink} />
            )
            : (
              <Prompt
                text="Add a background"
                color="pink"
              />
            )
          }
        </div>
      </TemplatePreview>
    );
  }
}

const styles = {
  container: {
    base: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer'
    },

    disabled: {
      pointerEvents: 'none'
    }
  },

  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
};