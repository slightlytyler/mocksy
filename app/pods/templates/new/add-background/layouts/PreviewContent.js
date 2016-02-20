'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import addIcon from 'assets/icons/add-pink.svg';
import colors from 'constants/colors';
import TemplatePreview from 'pods/template/components/Preview';
import wireframe from '../assets/wireframe.svg';
import Prompt from 'components/Prompt';
import Spinner from 'components/Spinner';

@Radium
export default class TemplatesNewAddBackgroundPreviewContent extends Component {
  static propTypes = {
    addTemplateBackground: PropTypes.func,
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  state = {
    loading: false
  };

  handleClick = () => {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });

      this.props.addTemplateBackground(() =>
        this.setState({
          loading: false
        })
      );
    }
  }

  render() {
    const {
      addTemplateBackground,
      canvasDimensions
    } = this.props;

    return (
      <TemplatePreview
        backgroundPath={wireframe}
        dimensions={{
          width: 255,
          height: 512,

          foreground: {
            x: 25,
            y: 70,
            width: 203,
            height: 371
          }
        }}
        canvasDimensions={canvasDimensions}
        cursor="pointer"
        handleClick={this.handleClick}
      >
        <Prompt
          text={this.state.loading ? 'Loading...' : 'Add a background'}
          fontSize={20}
          icon={addIcon}
          color={colors.pink}
          containerDimensions={{
            width: 203,
            height: 371
          }}
        />
      </TemplatePreview>
    );
  }
}

const styles = {
};
