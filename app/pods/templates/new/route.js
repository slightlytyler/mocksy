import { clearNewTemplate } from 'pods/templates/actions';

export function onLeave(dispatch) {
  dispatch(clearNewTemplate());
}