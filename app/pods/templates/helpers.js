import path from 'path';
import { app } from 'remote';

export function computeTemplateImages(id, format) {
  const userDataPath = app.getPath('userData');
  const templatesPath = path.join(userDataPath, 'templates');
  const templateDir = path.join(templatesPath, id);
  const lowerCaseFormat = format.toLowerCase();

  return {
    background: path.format({
      root : `/`,
      dir : templateDir,
      base : `template.${lowerCaseFormat === 'jpeg' ? 'jpg' : lowerCaseFormat}`
    }),
    thumbnail: path.format({
      root : `/`,
      dir : templateDir,
      base : `thumbnail.${lowerCaseFormat === 'jpeg' ? 'jpg' : lowerCaseFormat}`
    })
  }
}