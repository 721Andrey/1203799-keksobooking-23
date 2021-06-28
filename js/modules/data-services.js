import {getRandomNumber, getRandomFloat, getRandomArrayElement, getRandomArrayLength} from './utils.js';

const OBJECT_GENERATION_COUNT = 10;
const TITLES = [
  'Заголовок_1',
  'Заголовок_2',
  'Заголовок_3',
  'Заголовок_4',
  'Заголовок_5',
];

const HOUSES_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
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

const createAdvert = () => {
  const LAT = getRandomFloat(35.65000, 35.70000, 5);
  const LNG = getRandomFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user${(String(0) + getRandomNumber(1, 8)).slice(0, 2)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${LAT}, ${LNG}`,
      price: getRandomNumber(500, 10000),
      type: getRandomArrayElement(HOUSES_TYPES),
      rooms: getRandomNumber(1, 100),
      guests: getRandomNumber(1, 6),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayLength(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayLength(PHOTOS),
    },
    location: {
      lat: LAT,
      lng: LNG,
    },
  };
};

const objectGeneration = (count) => new Array(count).fill(null).map(() => createAdvert());
const generations = objectGeneration(OBJECT_GENERATION_COUNT);

export {objectGeneration};
export {generations};
