const template = document.querySelector('#card').content.querySelector('.popup');
const offerCards = template.cloneNode(true);

const typesPremises = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const PHOTO_WIDTH = '45';
const PHOTO_HEIGTH = '40';
const PHOTO_ALT = 'Фотография жилья';

const objectGenerationCards = ({ author, offer }) => {
  const offerTitle = offerCards.querySelector('.popup__title');
  const offerAddress = offerCards.querySelector('.popup__text--address');
  const offerPrice = offerCards.querySelector('.popup__text--price');
  const offerType = offerCards.querySelector('.popup__type');
  const offerCapacity = offerCards.querySelector('.popup__text--capacity');
  const offerTimes = offerCards.querySelector('.popup__text--time');
  const offerFeatures = offerCards.querySelector('.popup__features');
  const offerDescription = offerCards.querySelector('.popup__description');
  const offerPhotos = offerCards.querySelector('.popup__photos');

  // Заголовок

  if (offer.title.length) {
    offerTitle.textContent = offer.title;
  }

  // Адрес

  if (offer.address.length) {
    offerAddress.textContent = offer.address;
  }

  // Цена

  if (offer.price) {
    //когда добавляю offer.price.length - не генерируется число
    //а добавляю offer.price.length !== 0 - генерируется. как так?
    offerPrice.innerHTML = `${offer.price} <span>₽/ночь</span>`;
  }

  // Тип жилья

  if (offer.type.length) {
    offerType.textContent = typesPremises[offer.type];
  }

  // Количество гостей и комнат

  if (offer.rooms && offer.guests) { //тут тоже с .length фокусы
    let roomsChange = 'комнат';
    let guestsChange = 'гостей';
    if (offer.rooms === 1) {
      roomsChange = 'комната';
    }
    if (offer.guests === 1) {
      guestsChange = 'гостя';
    }
    offerCapacity.textContent = `${offer.rooms} ${roomsChange} для ${offer.guests} ${guestsChange}`;
  }

  // Время

  if (offer.checkin.length && offer.checkout.length) {
    offerTimes.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }

  // Удобства

  const getFeatureList = offer.features.map((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', `popup__feature--${feature}`);
    return newFeature;
  });

  while (offerFeatures.firstChild) {
    offerFeatures.removeChild(offerFeatures.firstChild);
  }

  if (getFeatureList.length) {
    getFeatureList.map((feature) => offerFeatures.appendChild(feature));
  }

  // Описание

  if (offer.description.length) {
    offerDescription.textContent = offer.description;
  }

  // Фоточки

  const getPhotoList = offer.photos.map((photo) => {
    const newPhoto = document.createElement('img');
    newPhoto.classList.add('popup__photo');
    newPhoto.src = photo;
    newPhoto.width = PHOTO_WIDTH;
    newPhoto.height = PHOTO_HEIGTH;
    newPhoto.alt = PHOTO_ALT;
    return newPhoto;
  });

  while (offerPhotos.firstChild) {
    offerPhotos.removeChild(offerPhotos.firstChild);
  }

  if (getPhotoList.length) {
    getPhotoList.map((photo) => offerPhotos.appendChild(photo));
  }

  // Аватарка

  if (author.avatar.length) {
    const avatar = offerCards.querySelector('.popup__avatar');
    avatar.src = author.avatar;
  }

  return offerCards;
};

export {objectGenerationCards};
