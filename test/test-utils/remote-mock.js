// A mocked remote object for electron.remote
export default {
  dialog: {
    showOpenDialog: (props, callback) => callback(['path/to/file'])
  }
};