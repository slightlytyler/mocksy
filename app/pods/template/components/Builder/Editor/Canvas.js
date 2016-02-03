'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Surface,
  Group,
  ClippingRectangle,
  LinearGradient } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import { some, chain, pickBy, keys, merge } from 'lodash';

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
      marquee: false,
      marqueeDirection: false,
      ratio,
      rectDimensions: {
        width: props.dimensions.width * ratio,
        height: props.dimensions.height * ratio,
      },
      rectOffset: {
        x: props.dimensions.left * ratio,
        y: props.dimensions.top * ratio,
      },
      mouseCords: {
        x: 0,
        y: 0
      },
      mouseDownCords: {
        x: 0,
        y: 0
      }
    };
  }

  componentWillReceiveProps(newProps) {
    const { props } = this;
    const updatedDimensions = props.dimensions !== newProps.dimensions;
    const updatedBackground = props.backgroundDimensions !== newProps.backgroundDimensions;
    const updatedContainer = props.containerDimensions !== newProps.containerDimensions;

    if (updatedBackground || updatedContainer) {
      this.setState({
        ratio: newProps.containerDimensions.width / newProps.backgroundDimensions.width
      });
    }

    if (updatedDimensions) {
      this.setState({
        rectDimensions: {
          width: newProps.dimensions.width * this.state.ratio,
          height: newProps.dimensions.height * this.state.ratio
        },
        rectOffset: {
          x: newProps.dimensions.left * this.state.ratio,
          y: newProps.dimensions.top * this.state.ratio
        }
      });
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this), false);
  }

  startEditing(e) {
    const edgesClicked = this.checkEdge(
      {
        x: e.offsetX,
        y: e.offsetY
      },
      this.state.rectDimensions,
      this.state.rectOffset
    );

    if (edgesClicked) {
      this.setState({
        scaling: edgesClicked
      });
    }
    else {
      this.setState({
        dragging: true
      });
    }

    this.setState({
      mouseCords: {
        x: e.pageX,
        y: e.pageY
      }
    });
  }

  checkEdge(mouseOffset, rectDimensions, rectOffset) {
    const edges = {
      left: mouseOffset.x - rectOffset.x <= 10,
      right: mouseOffset.x - rectOffset.x >= rectDimensions.width - 10,
      top: mouseOffset.y - rectOffset.y <= 10,
      bottom: mouseOffset.y - rectOffset.y >= rectDimensions.height - 10
    };

    if (some(edges, val => val)) {
      return chain(edges)
        .pickBy(val => val)
        .keys()
        .value()
      ;
    }
    else {
      return false;
    }
  }

  handleMouseUp() {
    const {
      ratio,
      rectDimensions,
      rectOffset
    } = this.state;
    const width = Math.round(rectDimensions.width / ratio);
    const height = Math.round(rectDimensions.height / ratio);
    const x = Math.round(rectOffset.x / ratio);
    const y = Math.round(rectOffset.y / ratio);

    this.props.updateTemplateForeground({
      width,
      height,
      left: x,
      top: y
    });

    this.setState({
      scaling: false,
      dragging: false,
      marquee: false,
      marqueeDirection: false
    });
  }

  handleMouseMove(e) {
    const {
      scaling,
      dragging,
      marquee
    } = this.state;

    if (marquee) {
      this.handleMarquee(e)
    }
    else if (scaling) {
      this.handleScale(e)
    }
    else if (dragging) {
      this.handleDrag(e)
    }
  }

  startMarquee(e) {
    this.setState({
      marquee: true,
      rectDimensions: {
        width: 0,
        height: 0
      },
      rectOffset: {
        x: e.offsetX,
        y: e.offsetY
      },
      mouseCords: {
        x: e.pageX,
        y: e.pageY
      },
      mouseDownCords: {
        x: e.offsetX,
        y: e.offsetY
      }
    });
  }

  handleMarquee(e) {
    e.preventDefault();

    const { mouseDownCords } = this.state;
    const startX = mouseDownCords.x;
    const startY = mouseDownCords.y;
    const currentX = e.offsetX;
    const currentY = e.offsetY;

    // First we need to calculate the direction of the marquee
    const xDirectionPositive = currentX >= startX;
    const yDirectionPositive = currentY >= startY;

    // Handle x / width
    this.setState(merge({}, this.state, {
      rectDimensions: {
        width: (
          xDirectionPositive
          ? currentX - startX
          : startX - currentX
        )
      },
      rectOffset: {
        x: (
          xDirectionPositive
          ? startX
          : currentX
        )
      }
    }));

    // Handle y / height
    this.setState(merge({}, this.state, {
      rectDimensions: {
        height: (
          yDirectionPositive
          ? currentY - startY
          : startY - currentY
        )
      },
      rectOffset: {
        y: (
          yDirectionPositive
          ? startY
          : currentY
        )
      }
    }));
  }

  handleScale(e) {
    e.preventDefault();

    const {
      scaling,
      rectDimensions,
      rectOffset,
      mouseCords
    } = this.state;
    const {
      width,
      height
    } = rectDimensions;
    const {
      x,
      y
    } = rectOffset;

    const xDiff = e.pageX - mouseCords.x;
    const yDiff = e.pageY - mouseCords.y;

    if (scaling.indexOf('left') !== -1) {
      this.setState(merge({}, this.state, {
        rectDimensions: {
          width: Math.round(width - xDiff)
        },
        rectOffset: {
          x: Math.round(x + xDiff)
        }
      }));
    }

    if (scaling.indexOf('right') !== -1) {
      this.setState(merge({}, this.state, {
        rectDimensions: {
          width: Math.round(width + xDiff)
        }
      }));
    }

    if (scaling.indexOf('top') !== -1) {
      this.setState(merge({}, this.state, {
        rectDimensions: {
          height: Math.round(height - yDiff)
        },
        rectOffset: {
          y: Math.round(y + yDiff)
        }
      }));
    }

    if (scaling.indexOf('bottom') !== -1) {
      this.setState(merge({}, this.state, {
        rectDimensions: {
          height: Math.round(height + yDiff)
        }
      }));
    }

    this.setState({
      mouseCords: {
        x: e.pageX,
        y: e.pageY
      }
    });
  }

  handleDrag(e) {
    e.preventDefault();

    const {
      rectOffset,
      mouseCords
    } = this.state;

    const xDiff = e.pageX - mouseCords.x;
    const yDiff = e.pageY - mouseCords.y;

    const newOffset = {
      x: Math.round(rectOffset.x + xDiff),
      y: Math.round(rectOffset.y + yDiff)
    };

    this.setState({
      rectOffset: newOffset
    });

    this.setState({
      mouseCords: {
        x: e.pageX,
        y: e.pageY
      }
    });
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
            <Rectangle
              ref="marquee"
              x={0}
              y={0}
              width={containerDimensions.width}
              height={containerDimensions.height}
              onMouseDown={(e) => this.startMarquee(e)}
              onMouseUp={(e) => this.handleMouseUp(e)}
              fill="rgba(0,0,0,0)"
            />
            <Group
              ref="preview"
              x={rectOffset.x}
              y={rectOffset.y}
              onMouseDown={(e) => this.startEditing(e)}
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