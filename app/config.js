import baseTemplates from 'constants/base-templates';

export const initialState = {
  templates: {
    records: {
      ...baseTemplates
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