import { createSelector } from 'reselect'
import { pick } from 'lodash';
import firstEntity from 'utils/first-entity';

import { basePathSelector } from 'selectors/routing';

export const templatesStateSelector = state => state.templates;
export const templatesEntitiesSelector = createSelector(
  templatesStateSelector,
  templates => templates.entities
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
  (entities, currentTemplateSetId) => {
    return pick(entities, template => template.set === currentTemplateSetId)
  }
);

export const currentTemplateIdSelector = createSelector(
  templatesConditionSelector,
  currentTemplateSetIdSelector,
  currentTemplateSetSelector,
  (condition, currentTemplateSetId, entities) => {

    if (condition.currentTemplateId) {
      return condition.currentTemplateId;
    }
    else {
      return currentTemplateSetId === 'default'
        ? firstEntity(entities, 'position').id
        : firstEntity(entities, 'createdAt').id;
    }
  }
);
export const currentTemplateSelector = createSelector(
  templatesEntitiesSelector,
  currentTemplateIdSelector,
  (entities, currentTemplateId) => entities[currentTemplateId]
);