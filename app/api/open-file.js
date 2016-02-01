import { dialog } from 'remote';

import gm from 'api/gm';
import acceptedImageFormats from 'constants/accepted-image-formats';

export default function openFile(action) {
  dialog.showOpenDialog({ multiSelections: false }, fileNames => {
    if (fileNames) {
      const path = fileNames[0];

      gm(path).identify((err, value) => {
        if (err) {
          alert('The file you selected is not recognized as an image.')
        }
        else {
          const selectedFileFormat = value.format.toLowerCase();
          const isAccepted = acceptedImageFormats.some(format =>
            selectedFileFormat === format.value || selectedFileFormat === format.alias
          );

          if (isAccepted) {
            action(path);
          }
          else {
            alert(`Mocksy doesn't currently support that ):`);
          }
        }
      });
    }
  });
}