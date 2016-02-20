import { dialog } from 'remote';

import gm from 'api/gm';
import acceptedImageFormats from 'constants/accepted-image-formats';

export default function openFile(success, error) {
  dialog.showOpenDialog({ multiSelections: false }, fileNames => {
    if (fileNames) {
      const path = fileNames[0];

      gm(path).identify((err, value) => {
        if (err) {
          alert('The file you selected is not recognized as an image.')

          if (error) {
            error();
          }
        }
        else {
          const selectedFileFormat = value.format.toLowerCase();
          const isAccepted = acceptedImageFormats.some(format =>
            selectedFileFormat === format.value || selectedFileFormat === format.alias
          );

          if (isAccepted) {
            success(path);
          }
          else {
            alert(`Mocksy doesn't currently support that ):`);

            if (error) {
              error();
            }
          }
        }
      });
    }
    else {
      error();
    }
  });
}