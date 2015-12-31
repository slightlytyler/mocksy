import { createSelector } from 'reselect'

const sizesStateSelector = state => state.sizes;
export const sizesEntitiesSelector = createSelector(
  sizesStateSelector,
  sizes => sizes.entities
);
export const sizesConditionSelector = createSelector(
  sizesStateSelector,
  sizes => sizes.condition
);