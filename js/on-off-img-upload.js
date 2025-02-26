import { scaleControlEventListener, normalizeScale } from './img-scale-change.js';
import { resetEffects, effectsEventListener } from './effects.js';

const bodyElement = document.querySelector('body');
const imgUploadElement = bodyElement.querySelector('.img-upload');
const imgUploadInputElement = imgUploadElement.querySelector('.img-upload__input');
const imgUploadOverlayElement = imgUploadElement.querySelector('.img-upload__overlay');
const imgUploadCancelElement = imgUploadElement.querySelector('.img-upload__cancel');
const hashtagInputElement = imgUploadOverlayElement.querySelector('.text__hashtags');
const commentInputElement = imgUploadOverlayElement.querySelector('.text__description');
const imgUploadFormElement = imgUploadElement.querySelector('.img-upload__form');

const resetErrorClass = () => {
  const imgUploadFieldWrapperList = imgUploadOverlayElement.querySelectorAll('.img-upload__field-wrapper');
  imgUploadFieldWrapperList.forEach((item) => {
    item.classList.remove('img-upload__field-wrapper--error');
  });
};

const resetErrorText = () => {
  const pristineErrorList = imgUploadOverlayElement.querySelectorAll('.pristine-error');
  pristineErrorList.forEach((item) => {
    item.textContent = '';
  });
};

const imgCloseActions = () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imgUploadInputElement.value = '';
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  resetErrorClass();
  resetErrorText();
  normalizeScale();
};

const imgUploadCancelElementClick = () => {
  removeEventsCloseImgUpload();
  imgCloseActions();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape'){
    evt.preventDefault();
    if(document.activeElement === hashtagInputElement || document.activeElement === commentInputElement){
      evt.stopPropagation();
      bodyElement.classList.add('modal-open');
    } else {
      removeEventsCloseImgUpload();
      imgCloseActions();
      imgUploadFormElement.reset();
    }
  }
};

function removeEventsCloseImgUpload () {
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancelElement.removeEventListener('click', imgUploadCancelElementClick);
}

const registerEventsOpenImgUpload = () => {
  imgUploadInputElement.addEventListener('change', () => {
    imgUploadOverlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    imgUploadCancelElement.addEventListener('click', imgUploadCancelElementClick);
    document.addEventListener('keydown', onDocumentKeydown);
    scaleControlEventListener();
    resetEffects();
    effectsEventListener();
  });
};

export {
  registerEventsOpenImgUpload
};
