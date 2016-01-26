'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { dialog } from 'remote';

import gm from 'api/gm';
import acceptedImageFormats from 'constants/accepted-image-formats';
import colors from 'constants/colors';
import AspectContainer from 'components/AspectContainer';
import wireframe from './assets/wireframe.svg';
import addIcon from 'assets/icons/add-background.svg';

@Radium
export default class TemplatesNew extends Component {
  static propTypes = {
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    actions: PropTypes.shape({
      createTemplateWithBackground: PropTypes.func.isRequired
    })
  };

  openFile() {
    dialog.showOpenDialog({ multiSelections: false }, fileNames => {
      if (fileNames) {
        const path = fileNames[0];

        gm(path).identify((err, value) => {
          if (err) {
            alert('The file you selected is not recognized as an image.')
          } else {
            const selectedFileFormat = value.format.toLowerCase();
            const isAccepted = acceptedImageFormats.some(format =>
              selectedFileFormat === format.value || selectedFileFormat === format.alias
            );

            if (isAccepted) {
              this.props.actions.createTemplateWithBackground(path)
            }
            else {
              alert(`Mocksy doesn't currently support that ):`);
            }
          }
        });
      }
    });
  }

  render() {
    const {
      canvasDimensions,
      actions
    } = this.props;
    const {
      addTemplate
    } = actions;

    return (
      <AspectContainer
        dimensions={{
          width: 255,
          height: 512
        }}
        canvasDimensions={{
          width: canvasDimensions.width,
          height: canvasDimensions.height
        }}
        handleClick={() => this.openFile()}
      >
        <section
          ref="prompt"
          style={styles.prompt.base}
        >
          <img
            src={addIcon}
            style={styles.prompt.icon}
          />
          <span style={styles.prompt.text}>
            Add a background
          </span>
        </section>

        <img
          ref="wireframe"
          src={wireframe}
          style={styles.wireframe.image}
        />
      </AspectContainer>
    );
  }
}

const styles = {
  wireframe: {
    image: {
      width: '100%',
    }
  },

  prompt: {
    base: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },

    icon: {
      width: '5em',
      marginBottom: '1em'
    },

    text: {
      fontSize: '2em',
      fontWeight: '200',
      color: colors.pink,
      whiteSpace: 'nowrap'
    }
  }
};