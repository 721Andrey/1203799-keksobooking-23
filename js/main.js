function getRandomNumber(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomFloat(min, max, digits = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];

const TITLES = [
  'Заголовок_1',
  'Заголовок_2',
  'Заголовок_3',
  'Заголовок_4',
  'Заголовок_5',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Описание помещения_1',
  'Описание помещения_2',
  'Описание помещения_3',
  'Описание помещения_4',
  'Описание помещения_5',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const OBJECT_GENERATION_COUNT = 10;

/*декомпозиции*/

const getRandomArrayElement = function(elements) { //eslint ругается на стрелочную функцию в этой строке ¯\_(ツ)_/¯
  return elements[getRandomNumber(0, elements.length - 1)];
};

const getRandomArrayLenght = (elements) => {
  const arrayLengh = getRandomNumber(1, elements.length);
  const array = [];
  for(let i = 0; i < arrayLengh; i++) {
    array.push(elements[i]);
  }
  return array;
};

/*до кучи*/

const createAdvert = function() {
  return {
    autor: {
      avatar: getRandomArrayElement(AVATARS),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${getRandomFloat(35.65000, 35.70000, 5)}, ${getRandomFloat(139.70000, 139.80000, 5)}`,
      price: getRandomNumber(500, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 100),
      quests: getRandomNumber(1, 6),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArrayLenght(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayLenght(PHOTOS),
    },
    location: {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5),
    },
  };
};

const objectGeneration = new Array(OBJECT_GENERATION_COUNT).fill(null).map(() => createAdvert());
objectGeneration;
