import { bootstrap } from './api.js';
import { showErrorMessage } from './utils.js';
import { renderTumbnails } from './render-tumbnails.js';
import { onOffBigPicture } from './on-off-big-picture.js';
import { registerEventsOpenImgUpload } from './on-off-img-upload.js';
import { initValidation } from './validation-hashtags-and-comments.js';
import { initFormSubmit } from './send-form.js';
import { configFilter } from './filters.js';

bootstrap(renderTumbnails, configFilter, onOffBigPicture, showErrorMessage);
registerEventsOpenImgUpload();
initValidation();
initFormSubmit();
