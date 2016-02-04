'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Surface,
  Group,
  ClippingRectangle,
  LinearGradient,
  Pattern
} from 'react-art';
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
      mode: 'transform',
      navigating: false,
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
      },
      zoom: 1,
      zoomOffset: {
        x: 0,
        y: 0
      }
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
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
      let ratio = this.state.ratio;

      this.setState({
        rectDimensions: {
          width: newProps.dimensions.width * ratio,
          height: newProps.dimensions.height * ratio
        },
        rectOffset: {
          x: newProps.dimensions.left * ratio,
          y: newProps.dimensions.top * ratio
        }
      });
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
    document.addEventListener('keydown', this.handleZoom, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove, false);
    document.removeEventListener('keydown', this.handleZoom, false);
  }

  handleMouseMove(e) {
    const {
      scaling,
      dragging,
      marquee,
      zoom,
      zoomOffset
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

    this.setState({
      mouseCords: {
        x: (e.offsetX - zoomOffset.x) / zoom,
        y: (e.offsetY - zoomOffset.y) / zoom
      }
    });
  }

  startMarquee(e) {
    const {
      mode,
      zoom,
      zoomOffset
    } = this.state;

    if (mode === 'transform') {
      this.setState({
        marquee: true,
        rectDimensions: {
          width: 0,
          height: 0
        },
        mouseDownCords: {
          x: (e.offsetX - zoomOffset.x) / zoom,
          y: (e.offsetY - zoomOffset.y) / zoom
        }
      });
    }
    else if (mode === 'navigate') {
      this.setState({
        navigating: true,
        mouseDownCords: {
          x: (e.offsetX - zoomOffset.x) / zoom,
          y: (e.offsetY - zoomOffset.y) / zoom
        }
      });
    }
  }

  handleMarquee(e) {
    e.preventDefault();

    const {
      mouseDownCords,
      mouseCords
    } = this.state;
    const startX = mouseDownCords.x;
    const startY = mouseDownCords.y;
    const currentX = mouseCords.x;
    const currentY = mouseCords.y;

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

  startTransform(e) {
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

  finishTransform() {
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

    const xDiff = e.offsetX - mouseCords.x;
    const yDiff = e.offsetY - mouseCords.y;

    if (scaling.indexOf('left') !== -1) {
      if (width - xDiff >= 0) {
        this.setState(merge({}, this.state, {
          rectDimensions: {
            width: width - xDiff
          },
          rectOffset: {
            x: x + xDiff
          }
        }));
      }
      else {
        this.setState(merge({}, this.state, {
          scaling: this.state.scaling.map(val => val === 'left' ? 'right' : val),
          rectDimensions: {
            width: xDiff - width
          },
          rectOffset: {
            x: x + width
          }
        }));
      }
    }
    else if (scaling.indexOf('right') !== -1) {
      if (width + xDiff >= 0) {
        this.setState(merge({}, this.state, {
          rectDimensions: {
            width: width + xDiff
          }
        }));
      }
      else {
        this.setState(merge({}, this.state, {
          scaling: this.state.scaling.map(val => val === 'right' ? 'left' : val),
          rectDimensions: {
            width: -(width + xDiff)
          },
          rectOffset: {
            x: x + (width + xDiff)
          }
        }));
      }
    }

    if (scaling.indexOf('top') !== -1) {
      if (height - yDiff >= 0) {
        this.setState(merge({}, this.state, {
          rectDimensions: {
            height: height - yDiff
          },
          rectOffset: {
            y: y + yDiff
          }
        }));
      }
      else {
        this.setState(merge({}, this.state, {
          scaling: this.state.scaling.map(val => val === 'top' ? 'bottom' : val),
          rectDimensions: {
            height: yDiff - height
          },
          rectOffset: {
            y: y + height
          }
        }));
      }
    }
    else if (scaling.indexOf('bottom') !== -1) {
      if (height + yDiff >= 0) {
        this.setState(merge({}, this.state, {
          rectDimensions: {
            height: height + yDiff
          }
        }));
      }
      else {
        this.setState(merge({}, this.state, {
          scaling: this.state.scaling.map(val => val === 'bottom' ? 'top' : val),
          rectDimensions: {
            height: -(height + yDiff)
          },
          rectOffset: {
            y: y + (height + yDiff)
          }
        }));
      }
    }
  }

  handleDrag(e) {
    e.preventDefault();

    const {
      rectOffset,
      mouseCords
    } = this.state;

    const xDiff = e.offsetX - mouseCords.x;
    const yDiff = e.offsetY - mouseCords.y;

    this.setState({
      rectOffset: {
        x: rectOffset.x + xDiff,
        y: rectOffset.y + yDiff
      }
    });
  }

  handleZoom(e) {
    const zoomScale = .15;
    const zoomIn = e.keyCode === 187
    const zoomOut = e.keyCode === 189

    if (zoomIn || zoomOut) {
      const increment = zoomIn ? zoomScale : -zoomScale;
      const {
        zoom,
        zoomOffset
      } = this.state;

      const { containerDimensions } = this.props;
      this.setState({
        zoom: zoom + increment,
        zoomOffset: {
          x: zoomOffset.x - ((containerDimensions.width * increment) / 2),
          y: zoomOffset.y - ((containerDimensions.height * increment) / 2),
        }
      });
    }
  }

  render() {
    const {
      backgroundPath,
      containerDimensions
    } = this.props;
    const {
      rectDimensions,
      rectOffset,
      zoom,
      zoomOffset
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
              ref="zoom-group"
              x={zoomOffset.x}
              y={zoomOffset.y}
              scaleX={zoom}
              scaleY={zoom}
            >
              <Rectangle
                width={containerDimensions.width}
                height={containerDimensions.height}
                fill={new Pattern(backgroundPath, containerDimensions.width , containerDimensions.height, 0, 0)}
              />
              <Rectangle
                ref="marquee"
                x={0}
                y={0}
                width={containerDimensions.width}
                height={containerDimensions.height}
                onMouseDown={(e) => this.startMarquee(e)}
                onMouseUp={(e) => this.finishTransform(e)}
                fill="rgba(0,0,0,0)"
              />
              <Group
                ref="preview"
                x={rectOffset.x}
                y={rectOffset.y}
                onMouseDown={(e) => this.startTransform(e)}
                onMouseUp={(e) => this.finishTransform(e)}
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