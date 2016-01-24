import path from 'path';
import { app } from 'remote';

export function computeTemplateImages(id, format) {
  const userDataPath = app.getPath('userData');
  const templatesPath = path.join(userDataPath, 'templates');
  const templateDir = path.join(templatesPath, id);

  return {
    background: path.format({
      root : `/`,
      dir : templateDir,
      base : `template.${format.toLowerCase()}`
    }),
    thumbnail: path.format({
      root : `/`,
      dir : templateDir,
      base : `thumbnail.${format.toLowerCase()}`
    })
  }
}