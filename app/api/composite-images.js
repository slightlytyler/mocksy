import path from 'path';
import { app } from 'remote';

import gm from 'api/gm';

export default function (template, templateSize, screenshot, screenshotDimensions, format, multiplier = 1) {
  const { width, height } = templateSize;

  return gm()
    .in('-geometry',`${width * multiplier}x${height * multiplier}`)
    .in('-page', '+0+0')
    .in(template)
    .in('-geometry',`${screenshotDimensions.width * multiplier}x${screenshotDimensions.height * multiplier}^`)
    .in('-crop', `${screenshotDimensions.width * multiplier}x${screenshotDimensions.height * multiplier}+0+0`)
    .in('-page', `+${screenshotDimensions.x * multiplier}+${screenshotDimensions.y * multiplier}`)
    .in(screenshot)
    .mosaic()
    .in('-background', format === 'png' ? 'transparent' : 'white');
}