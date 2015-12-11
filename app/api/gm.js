import path from 'path';
import { app } from 'remote';
import gm  from 'gm';

export default gm.subClass({appPath: path.join(app.getAppPath(), 'app/assets/gm/bin/')});