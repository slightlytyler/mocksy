import path from 'path';
import { app, dialog } from 'remote';
import { forEach } from 'lodash';

import compositeImages from 'api/composite-images';
import writeFile from 'api/write-file.js'

export default function(currentTemplate, screenshot, sizes) {
  const { foreground } = currentTemplate.dimensions;

  const template = path.join(app.getAppPath(), `app/assets/base-templates/${currentTemplate.id.toLowerCase()}/template.png`);

  // Get destination
  dialog.showSaveDialog(fullDestination => {
    const parsedDestination = path.parse(fullDestination);
    const destination = path.join(parsedDestination.dir, parsedDestination.name);

    // Build composites for each size
    forEach(sizes, size => {
      let {
        id,
        multiplier,
        suffix,
        format
      } = size;

      // Remove 'x' from multiplier and convert to number
      let computedMultipler = multiplier.slice(-1).toLowerCase() === 'x' ?
          Number(multiplier.slice(0, -1)) :
          Number(multiplier);

      // We don't pass the multiplier if it's NaN
      // so it defaults to 1
      let composite = compositeImages(
        template,
        currentTemplate.dimensions,
        screenshot,
        foreground,
        format,
        !isNaN(computedMultipler) && computedMultipler
      )

      // Write file
      writeFile(
        composite,
        destination,
        suffix,
        format,
        id
      );
    });
  });
}