import gm from 'api/gm';

export default function(path, cb) {
  gm(path).size((err, val) => cb(val));
}