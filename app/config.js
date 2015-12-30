import baseTemplates from 'constants/base-templates';

export const initialState = {
  present: {
    templates: {
      condition: {
        currentTemplate: 'iPhone_6'
      },

      entities: {
        ...baseTemplates
      }
    },

    screenshots: {
      condition: {
        currentScreenshot: null
      },

      entities: {

      }
    },

    sizes: {
      condition: {

      },

      entities: {
        0: {
          id: 0,
          multiplier: '1x',
          suffix: '',
          format: 'png'
        }
      }
    }
  }
}