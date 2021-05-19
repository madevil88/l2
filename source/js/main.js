'use strict';

(function () {
  const ESCAPE_KEY = 27;
  const pageBody = document.querySelector('body');
  const pageFooter = pageBody.querySelector('.page-footer');
  const pageFooterSections = pageFooter.querySelectorAll('.page-footer__section');
  const sectionButtons = pageFooter.querySelectorAll('.page-footer__toggle');
  const requestCallButton = pageBody.querySelector('.page-header__contacts-button');
  const popupFeedback = pageBody.querySelector('.popup-feedback');
  const popupFieldName = popupFeedback.querySelector('input[name="popup-username"]');
  const popupFieldPhone = popupFeedback.querySelector('input[name="popup-phone"]');
  const popupFieldMessage = popupFeedback.querySelector('textarea[name="popup-text"]');

  const feedbackForm = pageBody.querySelector('.feedback-form');
  const feedbackFieldName = feedbackForm.querySelector('input[name="username"]');
  const feedbackFieldPhone = feedbackForm.querySelector('input[name="phone"]');
  const feedbackFieldMessage = feedbackForm.querySelector('textarea[name="text"]');
  const feedbackSubmitButton = feedbackForm.querySelector('button[type="submit"]');

  const popupSubmitButton = popupFeedback.querySelector('button[type="submit"]');
  const popupCloseButton = popupFeedback.querySelector('.popup-feedback__close-button');
  const REG_EXP_PHONE = /[A-Za-zА-Яа-яЁё.!<>%$?:"'*,~|_№;=]/;
  const MAX_VALUE = 16;
  const maskPhone = {
    0: '+',
    2: '(',
    6: ')',
    10: '-',
    13: '-'
  };

  if (pageFooterSections && sectionButtons) {
    for (let i = 0; i < sectionButtons.length; i++) {
      pageFooterSections[i].classList.remove('page-footer__section--nojs');
      pageFooterSections[i].classList.add('page-footer__section--closed');

      sectionButtons[i].addEventListener('click', () => {
        pageFooterSections[i].classList.add('active');
        pageFooterSections.forEach((pageFooterSection) => {
          if (!pageFooterSection.classList.contains('active')) {
            pageFooterSection.classList.add('page-footer__section--closed');
          }
        });
        pageFooterSections[i].classList.toggle('page-footer__section--closed');
        pageFooterSections[i].classList.remove('active');
      });
    };
  }

  popupSubmitButton.addEventListener('click', () => {
    localStorage.setItem('userName', popupFieldName.value);
    localStorage.setItem('userPhone', popupFieldPhone.value);
    localStorage.setItem('userMessage', popupFieldMessage.value);
  });

  feedbackSubmitButton.addEventListener('click', () => {
    localStorage.setItem('userName', feedbackFieldName.value);
    localStorage.setItem('userPhone', feedbackFieldPhone.value);
    localStorage.setItem('userMessage', feedbackFieldMessage.value);
  });

  const openPopup = () => {
    if (popupFeedback) {
      popupFeedback.classList.add('popup-feedback--show');
      popupFieldName.focus();
      pageBody.style.overflow = 'hidden';
    }
  };

  const closePopup = () => {
    if (popupFeedback && popupFeedback.classList.contains('popup-feedback--show')) {
      popupFeedback.classList.remove('popup-feedback--show');
      pageBody.style.overflow = 'scroll';
    }
  };

  const outsideClickListener = function(evt) {
    const target = evt.target;
    const itsPopup = target == popupFeedback || popupFeedback.contains(target);
    const itsRequestCallButton = target == requestCallButton;
    const popupIsOpened = popupFeedback.classList.contains('popup-feedback--show');

    if (!itsPopup && !itsRequestCallButton && popupIsOpened) {
      closePopup();
    }
  }

  const validateFieldPhone = (evt) => {
    evt.target.value = evt.target.value.replace(REG_EXP_PHONE, '');
    evt.target.maxLength = MAX_VALUE;
    evt.target.value.length === 0 ? evt.target.value = '+' : evt.target.value;
    if (maskPhone[evt.target.value.length] && evt.data !== null) {
      evt.target.value = evt.target.value + maskPhone[evt.target.value.length];
    }
  };

  requestCallButton.addEventListener('click', () => {
    openPopup();
  });

  popupCloseButton.addEventListener('click', () => {
    closePopup();
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ESCAPE_KEY) {
      closePopup();
    }
  });

  document.addEventListener('click', outsideClickListener);

  popupFieldPhone.addEventListener('input', validateFieldPhone);

  feedbackFieldPhone.addEventListener('input', validateFieldPhone);

  popupFieldPhone.addEventListener('focus', (evt) => {
    evt.target.value = '+7(';
  });

  feedbackFieldPhone.addEventListener('focus', (evt) => {
    evt.target.value = '+7(';
  });
})();
