import { createSelector } from 'reselect'

const screenshotsStateSelector = state => state.screenshots;
export const screenshotsRecordsSelector = createSelector(
  screenshotsStateSelector,
  screenshots => screenshots.records
);
export const screenshotsConditionSelector = createSelector(
  screenshotsStateSelector,
  screenshots => screenshots.condition
);

export const currentScreenshotSelector = createSelector(
  screenshotsConditionSelector,
  condition => condition.currentScreenshot
);
