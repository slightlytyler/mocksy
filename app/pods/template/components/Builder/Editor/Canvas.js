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
      transforming: false,
      navigating: false,
      ratio,
      rectDimensions: {
        width: props.dimensions.width * ratio,
        height: props.dimensions.height * ratio,
        x: props.dimensions.left * ratio,
        y: props.dimensions.top * ratio
      },
      mouseCoords: {
        x: 0,
        y: 0
      },
      mouseDownCoords: {
        x: 0,
        y: 0
      },
      zoomScale: 1,
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
          height: newProps.dimensions.height * ratio,
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

  zoomTransformedCoordinates(coords) {
    const {
      zoomScale,
      zoomOffset
    } = this.state;

    return {
      x: (coords.x - zoomOffset.x) / zoomScale,
      y: (coords.y - zoomOffset.y) / zoomScale
    };
  }

  handleMouseMove(e) {
    const {
      transforming,
      navigating
    } = this.state;
    const coords = this.zoomTransformedCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });

    if (transforming) {
      switch (transforming.type) {
        case 'marquee':
          this.handleMarquee(e);
          break;
        case 'scaling':
          this.handleScale(e);
          break;
        case 'dragging':
          this.handleDrag(e);
      }
    }
    else if (navigating) {
      this.handleNavigation(e);
    }

    this.setState({
      mouseCoords: coords
    });
  }

  startMarquee(e) {
    const { mode } = this.state;
    const coords = this.zoomTransformedCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });

    if (mode === 'transform') {
      this.setState({
        transforming: {
          type: 'marquee'
        },
        rectDimensions: {
          width: 0,
          height: 0
        },
        mouseDownCoords: coords
      });
    }
    else if (mode === 'navigate') {
      this.setState({
        navigating: true,
        mouseDownCoords: coords
      });
    }
  }

  handleMarquee(e) {
    e.preventDefault();

    const {
      mouseDownCoords,
      mouseCoords
    } = this.state;
    const startX = mouseDownCoords.x;
    const startY = mouseDownCoords.y;
    const currentX = mouseCoords.x;
    const currentY = mouseCoords.y;

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
        ),
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
        ),
        y: (
          yDirectionPositive
          ? startY
          : currentY
        )
      }
    }));
  }

  checkEdge(mouseOffset, rectDimensions) {
    // Determines if a click on a the preview rectangle is
    // on the edge or within buffer
    const buffer = 5;

    const edges = {
      left: mouseOffset.x - rectDimensions.x <= buffer,
      right: mouseOffset.x - rectDimensions.x >= rectDimensions.width - buffer,
      top: mouseOffset.y - rectDimensions.y <= buffer,
      bottom: mouseOffset.y - rectDimensions.y >= rectDimensions.height - buffer
    };

    if (some(edges, val => val)) {
      // Returns an array of edge keys that are true for
      // the above checks
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

  startTransform(e) {
    const coords = this.zoomTransformedCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });
    const edgesClicked = this.checkEdge(
      {
        x: coords.x,
        y: coords.y
      },
      this.state.rectDimensions
    );

    if (edgesClicked) {
      this.setState({
        transforming: {
          type: 'scaling',
          args: [edgesClicked]
        }
      });
    }
    else {
      this.setState({
        transforming: {
          type: 'dragging'
        }
      });
    }
  }

  finishTransform() {
    const {
      ratio,
      rectDimensions
    } = this.state;
    const width = Math.round(rectDimensions.width / ratio);
    const height = Math.round(rectDimensions.height / ratio);
    const x = Math.round(rectDimensions.x / ratio);
    const y = Math.round(rectDimensions.y / ratio);

    this.props.updateTemplateForeground({
      width,
      height,
      left: x,
      top: y
    });

    this.setState({
      transforming: false,
      navigating: false
    });
  }

  handleScale(e) {
    e.preventDefault();

    const {
      transforming,
      rectDimensions,
      mouseCoords
    } = this.state;
    const edges = transforming.args[0];
    const {
      width,
      height,
      x,
      y
    } = rectDimensions;
    const currentMouseCoords = this.zoomTransformedCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });

    const xDiff = currentMouseCoords.x - mouseCoords.x;
    const yDiff = currentMouseCoords.y - mouseCoords.y;

    if (edges.indexOf('left') !== -1) {
      if (width - xDiff >= 0) {
        this.setState(merge({}, this.state, {
          rectDimensions: {
            width: width - xDiff,
            x: x + xDiff
          }
        }));
      }
      else {
        this.setState(merge({}, this.state, {
          transforming: {
            type: 'scaling',
            args: [edges.map(val => val === 'left' ? 'right' : val)]
          },
          rectDimensions: {
            width: xDiff - width,
            x: x + width
          }
        }));
      }
    }
    else if (edges.indexOf('right') !== -1) {
      if (width + xDiff >= 0) {
        this.setState(merge({}, this.state, {
          rectDimensions: {
            width: width + xDiff
          }
        }));
      }
      else {
        this.setState(merge({}, this.state, {
          transforming: {
            type: 'scaling',
            args: [edges.map(val => val === 'right' ? 'left' : val)]
          },
          rectDimensions: {
            width: -(width + xDiff),
            x: x + (width + xDiff)
          }
        }));
      }
    }

    if (edges.indexOf('top') !== -1) {
      if (height - yDiff >= 0) {
        this.setState(merge({}, this.state, {
          rectDimensions: {
            height: height - yDiff,
            y: y + yDiff
          }
        }));
      }
      else {
        this.setState(merge({}, this.state, {
          transforming: {
            type: 'scaling',
            args: [edges.map(val => val === 'top' ? 'bottom' : val)]
          },
          rectDimensions: {
            height: yDiff - height,
            y: y + height
          }
        }));
      }
    }
    else if (edges.indexOf('bottom') !== -1) {
      if (height + yDiff >= 0) {
        this.setState(merge({}, this.state, {
          rectDimensions: {
            height: height + yDiff
          }
        }));
      }
      else {
        this.setState(merge({}, this.state, {
          transforming: {
            type: 'scaling',
            args: [edges.map(val => val === 'bottom' ? 'top' : val)]
          },
          rectDimensions: {
            height: -(height + yDiff),
            y: y + (height + yDiff)
          }
        }));
      }
    }
  }

  handleDrag(e) {
    e.preventDefault();

    const {
      rectDimensions,
      mouseCoords
    } = this.state;
    const currentMouseCoords = this.zoomTransformedCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });
    const xDiff = currentMouseCoords.x - mouseCoords.x;
    const yDiff = currentMouseCoords.y - mouseCoords.y;

    this.setState(merge({}, this.state, {
      rectDimensions: {
        x: rectDimensions.x + xDiff,
        y: rectDimensions.y + yDiff
      }
    }));
  }

  handleZoom(e) {
    const step = .15;
    const zoomIn = e.keyCode === 187
    const zoomOut = e.keyCode === 189

    if (zoomIn || zoomOut) {
      e.preventDefault();

      const increment = zoomIn ? step : -step;
      const {
        zoomScale,
        zoomOffset
      } = this.state;

      const { containerDimensions } = this.props;
      this.setState({
        zoomScale: zoomScale + increment,
        zoomOffset: {
          x: zoomOffset.x - ((containerDimensions.width * increment) / 2),
          y: zoomOffset.y - ((containerDimensions.height * increment) / 2),
        }
      });
    }
  }

  handleNavigation(e) {
    e.preventDefault();

    const {
      zoomOffset,
      mouseCoords
    } = this.state;
    const currentMouseCoords = this.zoomTransformedCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });
    const xDiff = currentMouseCoords.x - mouseCoords.x;
    const yDiff = currentMouseCoords.y - mouseCoords.y;

    this.setState({
      zoomOffset: {
        x: zoomOffset.x + xDiff,
        y: zoomOffset.y + yDiff
      }
    });
  }

  render() {
    const {
      backgroundPath,
      containerDimensions
    } = this.props;
    const {
      rectDimensions,
      zoomScale,
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
              scaleX={zoomScale}
              scaleY={zoomScale}
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
                x={rectDimensions.x}
                y={rectDimensions.y}
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