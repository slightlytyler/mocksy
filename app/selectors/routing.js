import pathModule from 'path';
import { createSelector } from 'reselect'

export const routingSelector = state => state.routing;
export const locationSelector = createSelector(
  routingSelector,
  routing => routing.location
);
export const pathSelector = createSelector(
  locationSelector,
  location => location.pathname
);
export const basePathSelector = createSelector(
  pathSelector,
  path => pathModule.basename(path)
);