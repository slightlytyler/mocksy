import { createSelector } from 'reselect'

const sizesStateSelector = state => state.sizes;
export const sizesRecordsSelector = createSelector(
  sizesStateSelector,
  sizes => sizes.records
);
export const sizesConditionSelector = createSelector(
  sizesStateSelector,
  sizes => sizes.condition
);