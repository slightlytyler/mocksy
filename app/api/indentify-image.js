import gm from 'api/gm';

export default function(path, cb) {
  gm(path).identify((err, val) => {
    const { format, size } = val;

    var data = {
      format,
      size
    };

    cb(data);
  });
}