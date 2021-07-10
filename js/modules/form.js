import {sendData} from './api.js';
import {createSuccessMessage, createErrorMessage} from './message-error.js';
import {setInitialAddress} from './load-map.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MAX_PRICE = 1000000;
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const roomsAndGuests = {
  '1': (value) => value !== 1,
  '2': (value) => value > 2 || value < 1,
  '3': (value) => value < 1,
  '100': (value) => value !== 0,
};

const adForm = document.querySelector('.ad-form');
const titleForm = adForm.querySelector('#title');
const priceForm = adForm.querySelector('#price');
const typeForm = adForm.querySelector('#type');
const roomForm = adForm.querySelector('#room_number');
const capacityForm = adForm.querySelector('#capacity');
const timeCheckin = adForm.querySelector('#timein');
const timeCheckout = adForm.querySelector('#timeout');
const resetButton = document.querySelector('.ad-form__reset');

// Заголовок объявления

titleForm.addEventListener('input', () => {
  const valueLength = titleForm.value.length;
  if (valueLength < TITLE_MIN_LENGTH) {
    titleForm.setCustomValidity(`Маловато будет. Необходимое количество символов еще вот столько: ${ TITLE_MIN_LENGTH - valueLength }.`);
  } else if (valueLength > TITLE_MAX_LENGTH) {
    titleForm.setCustomValidity(`Перебор. Лишних символов вот столько: ${ valueLength - TITLE_MAX_LENGTH }.`);
  } else {
    titleForm.setCustomValidity('');
  }
  titleForm.reportValidity();
});

// Цена за ночь

priceForm.addEventListener('input', () => {
  const value = Number(priceForm.value);
  const housingType = typeForm.value;
  if (value < minPrice[housingType]) {
    priceForm.setCustomValidity(`Минимальная цена ${minPrice[housingType]} руб.`);
  } else if (value > MAX_PRICE) {
    priceForm.setCustomValidity(`Максимальная цена ${MAX_PRICE} руб.`);
  } else {
    priceForm.setCustomValidity('');
  }
  priceForm.reportValidity();
});

// Плейсхолдер

typeForm.addEventListener('input', () => {
  priceForm.placeholder = minPrice[typeForm.value];
});

// Количество комнат и мест

roomForm.addEventListener('input', () => {
  const value = roomForm.value;
  const status = roomsAndGuests[value];
  capacityForm.querySelectorAll('option').forEach((item) => {
    item.disabled = status(Number(item.value));
  });
});

// Синхронизация времени

timeCheckin.addEventListener('input', () => {
  timeCheckout.value = timeCheckin.value;
});

timeCheckout.addEventListener('input', () => {
  timeCheckin.value = timeCheckout.value;
});

// Кнопка сброса

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  setInitialAddress();
});

const setFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        adForm.reset();
        setInitialAddress();
        createSuccessMessage();
      },
      () => createErrorMessage(),
      new FormData(evt.target),
    );
  });
};

export {setFormSubmit};
