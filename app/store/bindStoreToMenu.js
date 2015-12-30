import { Menu } from 'remote';
import { ActionCreators as undoRedoActions } from 'redux-undo';

export default function bindStoreToMenu(store) {
  let appMenu = Menu.getApplicationMenu();
  let editSubMenu = appMenu.items[1].submenu;
  let undoRedoMenu = Menu.buildFromTemplate([
    {
      label: 'Undo',
      accelerator: 'Command+Z',
      selector: 'undo:',
      enabled: false,
      click() {
        store.dispatch(undoRedoActions.undo());
      }
    },
    {
      label: 'Redo',
      accelerator: 'Shift+Command+Z',
      selector: 'redo:',
      enabled: false,
      click() {
        store.dispatch(undoRedoActions.redo());
      }
    }
  ]);

  editSubMenu.insert(0, undoRedoMenu.items[0]);
  editSubMenu.insert(1, undoRedoMenu.items[1]);
}