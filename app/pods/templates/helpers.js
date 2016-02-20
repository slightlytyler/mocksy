import path from 'path';
import { app } from 'remote';

export function computeTemplateImages(id, set="default", format='PNG') {
  const basePath =
    set === 'default'
    ? path.join(app.getAppPath(), 'app/assets')
    : app.getPath('userData')
  ;
  const templatesPath = path.join(basePath, 'templates');
  const templateDir = path.join(templatesPath, id);
  const lowerCaseFormat = format.toLowerCase();

  return {
    full: path.format({
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