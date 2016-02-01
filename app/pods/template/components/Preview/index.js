'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { computeTemplateImages } from 'pods/templates/helpers';
import AspectContainer from 'components/AspectContainer';
import Foreground from 'pods/template/components/Preview/Foreground';

@Radium
export default class TemplatePreview extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    set: PropTypes.string.isRequired,
    format: PropTypes.string,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  };
  render() {
    const {
      id,
      set,
      format,
      dimensions,
      canvasDimensions,
      children
    } = this.props;
    const backgroundPath = computeTemplateImages(id, set, format).full;

    return (
      <AspectContainer
        dimensions={dimensions}
        canvasDimensions={canvasDimensions}
      >
        <img
          src={backgroundPath}
          style={styles.background}
        />
        <Foreground
          backgroundDimensions={dimensions}
          dimensions={dimensions.foreground}
        >
          {children}
        </Foreground>
      </AspectContainer>
    );
  }
}

const styles = {
  background: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%'
  }
};