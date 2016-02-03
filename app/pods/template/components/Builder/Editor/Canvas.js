'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Surface,
  Group,
  ClippingRectangle,
  LinearGradient } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import colors from 'constants/colors';

@Radium
export default class TemplateBuilderEditorCanvas extends Component {
  static propTypes = {
    dimensions: PropTypes.object.isRequired,
    containerDimensions: PropTypes.object,
    updateTemplateForeground: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      mouseDownCords: {
        x: 0,
        y: 0
      },
      offset: {
        x: this.props.dimensions.left,
        y: this.props.dimensions.top
      }
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this), false);
  }

  handleMouseDown(e) {
    this.setState({
      dragging: true,
      mouseCords: {
        x: e.pageX,
        y: e.pageY
      }
    });
  }

  handleMouseUp() {
    const x = Math.round(this.state.offset.x);
    const y = Math.round(this.state.offset.y);
    this.props.updateTemplateForeground({
      left: x,
      top: y
    });

    this.setState({
      dragging: false,

      offset: {
        x,
        y
      }
    });
  }

  handleMouseMove(e) {
    if (this.state.dragging) {
      e.preventDefault();

      const ratio = this.props.containerDimensions.width / this.props.backgroundDimensions.width;
      const { mouseCords } = this.state;
      const xDiff = (e.pageX - mouseCords.x) / ratio;
      const yDiff = (e.pageY - mouseCords.y) / ratio;
      const newOffset = {
        x: Math.round(xDiff + this.state.offset.x),
        y: Math.round(yDiff + this.state.offset.y)
      };

      this.setState({
        offset: newOffset,

        mouseCords: {
          x: e.pageX,
          y: e.pageY
        }
      });
    }
  }

  render() {
    const {
      dimensions,
      backgroundDimensions,
      containerDimensions
    } = this.props;
    const ratio = containerDimensions.width / backgroundDimensions.width;

    const left = dimensions.left * ratio;
    const top = dimensions.top * ratio;
    const width = dimensions.width * ratio;
    const height =dimensions.height * ratio;

    if (containerDimensions) {
      return (
        <div
          onMouseDown={(e) => this.handleMouseDown(e)}
          onMouseUp={(e) => this.handleMouseUp(e)}
        >
          <Surface
            width={containerDimensions.width}
            height={containerDimensions.height}
            style={styles.surface}
          >
            <Group x={this.state.offset.x * ratio} y={this.state.offset.y * ratio}>
              <ClippingRectangle
                x={0}
                y={0}
                width={width}
                height={height}
              >
                <Rectangle
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                  fill={new LinearGradient([colors.pink, colors.orange])}
                  stroke={colors.white}
                  strokeWidth={4}
                  strokeDash={[9, 10]}
                  strokeCap="square"
                />
              </ClippingRectangle>
            </Group>
          </Surface>
        </div>
      );
    }
    else {
      return (<div>Loading</div>);
    }
  }
}

const styles = {
  surface: {
    position: 'absolute',
    left: 0,
    top: 0
  }
};