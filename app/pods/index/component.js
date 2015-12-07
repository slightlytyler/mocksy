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
            style={styles.sidebar.exportPanel.base}
          >
            <header
              style={[
                styles.sidebar.exportPanel.section,
                styles.sidebar.exportPanel.header.base
              ]}
            >
              <span style={styles.sidebar.exportPanel.header.text}>
                Export
              </span>

              <img
                src="assets/icons/add-size.svg"
                style={styles.sidebar.exportPanel.header.addSizeIcon}
              />
            </header>

            <ul
              style={[
                styles.sidebar.exportPanel.section,
                styles.sidebar.exportPanel.sizeList.base,
              ]}
            >
              <li style={styles.sidebar.exportPanel.sizeList.item}>
                <div style={[
                  styles.sidebar.exportPanel.sizeList.item.input.container,
                  styles.sidebar.exportPanel.sizeList.item.size
                ]}>
                  <input
                    style={styles.sidebar.exportPanel.sizeList.item.input.base}
                  />

                  <label style={styles.sidebar.exportPanel.sizeList.item.input.label}>
                    Size
                  </label>
                </div>

                <div style={[
                  styles.sidebar.exportPanel.sizeList.item.input.container,
                  styles.sidebar.exportPanel.sizeList.item.suffix
                ]}>
                  <input
                    style={styles.sidebar.exportPanel.sizeList.item.input.base}
                  />

                  <label style={styles.sidebar.exportPanel.sizeList.item.input.label}>
                    Suffix
                  </label>
                </div>

                <div style={[
                  styles.sidebar.exportPanel.sizeList.item.input.container,
                  styles.sidebar.exportPanel.sizeList.item.format
                ]}>
                  <input
                    style={styles.sidebar.exportPanel.sizeList.item.input.base}
                  />

                  <label style={styles.sidebar.exportPanel.sizeList.item.input.label}>
                    Format
                  </label>
                </div>

                <div
                  style={styles.sidebar.exportPanel.sizeList.item.remove}
                >
                  <img
                    style={styles.sidebar.exportPanel.sizeList.item.remove.icon}
                    src="assets/icons/remove-size.svg"
                  />
                </div>
              </li>
            </ul>

            <div
              style={[
                styles.sidebar.exportPanel.section,
                styles.sidebar.exportPanel.actions.base
              ]}
            >
              <button style={styles.sidebar.exportPanel.actions.export}>
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
      base: {
        dispay: 'flex',
        flexDirection: 'column',
        backgroundColor: '#EDF3F5',
      },

      section: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '.75em',
        paddingRight: '.75em',
        borderBottom: '1px solid #CFD8DC',
      },

      header: {
        base: {
          paddingTop: '.25em',
          paddingBottom: '.25em',
        },

        text: {
          fontSize: '1.25em',
          fontWeight: 400,
          color: '#263238'
        },

        addSizeIcon: {
          width: '1.25em'
        }
      },

      sizeList: {
        base: {
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '.5em',
          paddingBottom: '.5em',
        },

        item: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',

          input: {
            base: {
              width: '100%',
              marginBottom: '.25em'
            },

            container: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: '2em'
            },

            label: {
              fontSize: '.8em'
            }
          },

          size: {
            flex: 5,
          },

          suffix: {
            flex: 3,
          },

          format: {
            flex: 3,
          },

          remove: {
            alignSelf: 'flex-start',
            marginTop: '.25em',

            icon: {
              width: '1.25em'
            }
          }
        }
      },

      actions: {
        base: {
          display: 'flex',
          paddingTop: '.5em',
          paddingBottom: '.5em',
        },

        export: {
          flex: 1,
          color: '#607D8B',
          border: '1px solid #607D8B',
          borderRadius: '4px',
          backgroundColor: 'transparent'
        }
      }
    },
  },

  content: {
    base: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 10
    }
  }
}
