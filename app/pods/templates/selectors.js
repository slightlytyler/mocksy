import { createSelector } from 'reselect'
import { pick } from 'lodash';

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

export const currentTemplateIdSelector = createSelector(
  templatesConditionSelector,
  condition => condition.currentTemplate
);
export const currentTemplateSelector = createSelector(
  templatesEntitiesSelector,
  currentTemplateIdSelector,
  (entities, currentTemplateId) => entities[currentTemplateId]
);

export const currentTemplateSetIdSelector = createSelector(
  basePathSelector,
  path => path === 'user' ? 'user' : 'default'
);
export const currentTemplateSetSelector = createSelector(
  templatesEntitiesSelector,
  currentTemplateSetIdSelector,
  (entities, currentTemplateSetId) => pick(entities, template => template.set === currentTemplateSetId)
);