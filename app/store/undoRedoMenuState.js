import { Menu } from 'remote';

// Middleware to hanlde the state of the undo / redo menu items
const undoRedoMenuState = store => next => action => {
  let result = next(action);
  let { past, future } = store.getState();
  let editSubMenu = Menu.getApplicationMenu().items[1].submenu;

  if (past.length === 0) {
    editSubMenu.items[0].enabled = false;
  } else {
    editSubMenu.items[0].enabled = true;
  }

  if (future.length === 0) {
    editSubMenu.items[1].enabled = false;
  } else {
    editSubMenu.items[1].enabled = true;
  }

  return result;
}

export default undoRedoMenuState;