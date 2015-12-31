import { createSelector } from 'reselect'

const screenshotsStateSelector = state => state.screenshots;
export const screenshotsEntitiesSelector = createSelector(
  screenshotsStateSelector,
  screenshots => screenshots.entities
);
export const screenshotsConditionSelector = createSelector(
  screenshotsStateSelector,
  screenshots => screenshots.condition
);

export const currentScreenshotSelector = createSelector(
  screenshotsConditionSelector,
  condition => condition.currentScreenshot
);
