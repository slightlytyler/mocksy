import { createSelector } from 'reselect'
import { pick } from 'lodash';
import firstRecord from 'utils/first-record';

import { basePathSelector } from 'selectors/routing';

export const templatesStateSelector = state => state.templates;
export const templatesEntitiesSelector = createSelector(
  templatesStateSelector,
  templates => templates.records
);
export const templatesConditionSelector = createSelector(
  templatesStateSelector,
  templates => templates.condition
);

export const currentTemplateSetIdSelector = createSelector(
  basePathSelector,
  path => path === 'user' ? 'user' : 'default'
);
export const currentTemplateSetSelector = createSelector(
  templatesEntitiesSelector,
  currentTemplateSetIdSelector,
  (records, currentTemplateSetId) => {
    return pick(records, template => template.set === currentTemplateSetId)
  }
);

export const currentTemplateIdSelector = createSelector(
  templatesConditionSelector,
  currentTemplateSetIdSelector,
  currentTemplateSetSelector,
  (condition, currentTemplateSetId, records) => {

    if (condition.currentTemplateId) {
      return condition.currentTemplateId;
    }
    else {
      return currentTemplateSetId === 'default'
        ? firstRecord(records, 'position').id
        : firstRecord(records, 'createdAt').id;
    }
  }
);
export const currentTemplateSelector = createSelector(
  templatesEntitiesSelector,
  currentTemplateIdSelector,
  (records, currentTemplateId) => records[currentTemplateId]
);