const form = () => {
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

  // Заголовок объявления

  const getTitleValidity = () => {
    const valueLength = titleForm.value.length;
    if (valueLength < TITLE_MIN_LENGTH) {
      titleForm.setCustomValidity(`Маловато будет. Необходимое количество символов еще вот столько: ${ TITLE_MIN_LENGTH - valueLength }.`);
    } else if (valueLength > TITLE_MAX_LENGTH) {
      titleForm.setCustomValidity(`Перебор. Лишних символов вот столько: ${ valueLength - TITLE_MAX_LENGTH }.`);
    } else {
      titleForm.setCustomValidity('');
    }
    titleForm.reportValidity();
  };

  titleForm.addEventListener('input', getTitleValidity);

  // Цена за ночь

  const getPriceValidity = () => {
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
  };

  priceForm.addEventListener('input', getPriceValidity);

  // Плейсхолдер

  const getPriceinPlaceholder = () => {
    priceForm.placeholder = minPrice[typeForm.value];
  };

  typeForm.addEventListener('input', getPriceinPlaceholder);

  // Количество комнат и мест

  const changeGuestsByRooms = () => {
    const value = roomForm.value;
    const status = roomsAndGuests[value];
    capacityForm.querySelectorAll('option').forEach((item) => {
      item.disabled = status(Number(item.value));
    });
  };

  roomForm.addEventListener('input', changeGuestsByRooms);

  // Синхронизация времени

  const getTimeCheckin = () => {
    timeCheckout.value = timeCheckin.value;
  };
  timeCheckin.addEventListener('input', getTimeCheckin);

  const getTimeCheckout = () => {
    timeCheckin.value = timeCheckout.value;
  };
  timeCheckout.addEventListener('input', getTimeCheckout);

};

export {form};
