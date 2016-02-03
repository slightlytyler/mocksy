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
    backgroundDimensions: PropTypes.object.isRequired,
    containerDimensions: PropTypes.object,
    updateTemplateForeground: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const ratio = props.containerDimensions.width / props.backgroundDimensions.width;

    this.state = {
      dragging: false,
      scaling: false,
      ratio,
      rectDimensions: {
        width: props.dimensions.width * ratio,
        height: props.dimensions.height * ratio,
      },
      rectOffset: {
        x: props.dimensions.left * ratio,
        y: props.dimensions.top * ratio,
      },
      mouseDownCords: {
        x: 0,
        y: 0
      }
    };
  }

  componentWillReceiveProps(newProps) {
    const { props } = this;
    const updatedContainer = props.containerDimensions !== newProps.containerDimensions;
    const updatedBackground = props.backgroundDimensions !== newProps.backgroundDimensions;

    if (updatedContainer || updatedBackground) {
      this.setState({
        ratio: newProps.containerDimensions.width / newProps.backgroundDimensions.width
      });
    }
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
    const {
      ratio,
      rectOffset
    } = this.state;
    const x = Math.round(rectOffset.x / ratio);
    const y = Math.round(rectOffset.y / ratio);

    this.props.updateTemplateForeground({
      left: x,
      top: y
    });

    this.setState({
      dragging: false
    });
  }

  handleMouseMove(e) {
    if (this.state.dragging) {
      e.preventDefault();

      const { mouseCords } = this.state;
      const xDiff = e.pageX - mouseCords.x;
      const yDiff = e.pageY - mouseCords.y;
      const newOffset = {
        x: Math.round(xDiff + this.state.rectOffset.x),
        y: Math.round(yDiff + this.state.rectOffset.y)
      };

      this.setState({
        rectOffset: newOffset,
        mouseCords: {
          x: e.pageX,
          y: e.pageY
        }
      });
    }
  }

  render() {
    const { containerDimensions } = this.props;
    const {
      rectDimensions,
      rectOffset
    } = this.state;

    if (containerDimensions) {
      return (
        <div>
          <Surface
            width={containerDimensions.width}
            height={containerDimensions.height}
            style={styles.surface}
          >
            <Group
              x={rectOffset.x}
              y={rectOffset.y}
              onMouseDown={(e) => this.handleMouseDown(e)}
              onMouseUp={(e) => this.handleMouseUp(e)}
            >
              <ClippingRectangle
                x={0}
                y={0}
                width={rectDimensions.width}
                height={rectDimensions.height}
              >
                <Rectangle
                  x={0}
                  y={0}
                  width={rectDimensions.width}
                  height={rectDimensions.height}
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
  },
};