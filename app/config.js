import baseTemplates from 'constants/base-templates';

export const initialState = {
  templates: {
    records: {
      ...baseTemplates
    },
    editor: {
      mode: 'transform',
      currentTransform: false,
      zoom: {
        scale: 1,
        offset: {
          x: 0,
          y: 0
        }
      }
    }
  },

  screenshots: {
    condition: {
      currentScreenshot: null
    },

    records: {

    }
  },

  sizes: {
    condition: {

    },

    records: {
      0: {
        id: 0,
        multiplier: '1x',
        suffix: '',
        format: 'png'
      }
    }
  }
}