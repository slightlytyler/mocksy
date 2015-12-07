import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import fs from 'fs';
import gm from 'gm';

import FileInput from 'react-file-input';

@Radium
export default class IndexComponent extends Component {
  test(path) {
    gm()
    .in('-page', '+0+0')
    .in('./app/pods/index/input.png')
    .in('-geometry','420x748')
    .in('-page', '+28+117')
    .in(path)
    .mosaic()
    .write('./app/pods/index/output.png', function(err) {
      if(!err) console.log("Written composite image.");
    });
  }

  handleFile(event) {
    this.test(event.target.files[0].path);
  }

  render() {
    return (
      <div
        className="index"
        style={styles.base}
      >
        <section
          className="sidebar"
          style={styles.sidebar.base}
        >
          <ul
            className="template-list"
            style={styles.sidebar.templateList}
          >
            <li style={styles.sidebar.templateItem.base}>
              <div style={styles.sidebar.templateItem.preview.container}>
                <img
                  src="assets/base-templates/iphone-6/thumbnail.png"
                  style={styles.sidebar.templateItem.preview.image}
                />
              </div>

              <div style={styles.sidebar.templateItem.name.container}>
                <span style={styles.sidebar.templateItem.name.text}>
                  iPhone 6
                </span>
              </div>
            </li>
          </ul>

          <section
            className="export-panel"
            style={styles.sidebar.exportPanel}
          >
            <header>
              <span>
                Export
              </span>

              <img />
            </header>

            <ul>
              <li>
                <input />
                <input />
                <input />
                <img />
              </li>
            </ul>

            <div>
              <button>
                Export Screenshot
              </button>
            </div>
          </section>
        </section>

        <section
          className="preview"
          style={styles.content.base}
        >
          <div>
            <img />
            <span>Add a screenshot</span>
          </div>
          <img />
        </section>
      </div>
    );
  }
}

const styles={
  base: {
    display: 'flex'
  },

  sidebar: {
    base: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 3,
      height: '100vh',
      backgroundColor: '#CFD8DC',
      borderLeft: '1px solid rgba(0, 0, 0, 0.15)',
      boxShadow: 'rgba(0, 0, 0, 0.25) 2px 0 4px'
    },

    templateList: {

    },

    templateItem: {
      base: {
        display: 'flex',
        borderBottom: '1px solid #EDF3F5'
      },

      preview: {
        container: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          padding: '1em'
        },

        image: {
          maxWidth: '100%',
          maxHeight: '7.5em'
        }
      },

      name: {
        container: {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 2
        },

        text: {
          fontSize: '2em',
          fontWeight: 100,
          color: '#607D8B'
        }
      }
    },

    exportPanel: {

    },
  },

  content: {
    base: {
      flex: 10
    }
  }
}
