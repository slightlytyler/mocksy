'use strict'

import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import { app } from 'remote';

import gm from 'api/gm';

// Accepts path of stock background as an argument
// Creates a directory for the new template in userData
// Copies the file from path to new directory
// Creates a thumbnail for the template
export default function(id, stockPath) {
  const userDataPath = app.getPath('userData');
  const templatesPath = path.join(userDataPath, 'templates');
  const templateDir = path.join(templatesPath, id);

  mkdirp(templateDir, (err) => {
    if (err) {
      console.log(`Could not create a directory for template ${id}.`);
    }
    else {
      createTemplateImage(stockPath, templateDir);
      createThumbnailImage(stockPath, templateDir);
    }
  })
}

function createTemplateImage(stockPath, templateDir) {
  const graphic = gm(stockPath);

  const destination = path.format({
    root: '/',
    dir: templateDir,
    base: `template${path.extname(stockPath)}`
  });

  graphic.write(destination, (err) => {
    if (err) {
      console.log('Could not write template file');
      console.log(err);
    }
  });
}

function createThumbnailImage(stockPath, templateDir) {
  const graphic = gm(stockPath).resize(200);

  const destination = path.format({
    root: '/',
    dir: templateDir,
    base: `thumbnail${path.extname(stockPath)}`
  });

  graphic.write(destination, (err) => {
    if (err) {
      console.log('Could not write thumbnail file');
      console.log(err);
    }
  });
}