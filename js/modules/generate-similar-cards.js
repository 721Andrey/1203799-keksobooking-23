const template = document.querySelector('#card').content.querySelector('.popup');
const offerCards = template.cloneNode(true);

const typesPremises = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

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

  offerTitle.textContent = offer.title;
  if (offer.title.length === 0) {
    offerTitle.classList.add('visually-hidden');
  }

  // Адрес

  offerAddress.textContent = offer.address;
  if (offer.address.length === 0) {
    offerAddress.classList.add('visually-hidden');
  }

  // Цена

  offerPrice.textContent = `${offer.price} ₽/ночь`;
  if (offer.price.length === 0) {
    offerPrice.classList.add('visually-hidden');
  }

  // Тип жилья

  offerType.textContent = typesPremises[offer.type];
  if (offer.type.length === 0) {
    offerType.classList.add('visually-hidden');
  }

  // Количество гостей и комнат

  if (offer.rooms.length === 0 && offer.guests.length === 0) {
    return offerCapacity.classList.add('visually-hidden');
  } else {
    let roomsChange = 'комнат';
    let guestsChange = 'гостей';
    if (offer.rooms.length === 1) {
      roomsChange = 'комната';
    }
    if (offer.guests.length === 1) {
      guestsChange = 'гостя';
    }
    offerCapacity.textContent = `${offer.rooms} ${roomsChange} для ${offer.guests} ${guestsChange}`;
  }

  // Время

  offerTimes.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.checkin.length === 0 && offer.checkout.length === 0) {
    return offerTimes.classList.add('visually-hidden');
  }

  // Удобства

  const featureList = offer.features.map((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', `popup__feature--${feature}`);
    return newFeature;
  });

  while (offerFeatures.firstChild) {
    offerFeatures.removeChild(offerFeatures.firstChild);
  }

  featureList.map((feature) => offerFeatures.appendChild(feature));
  if (featureList.length === 0) {
    offerFeatures.classList.add('visually-hidden');
  }

  // Описание

  offerDescription.textContent = offer.description;
  if (offer.description.length === 0) {
    offerDescription.classList.add('visually-hidden');
  }

  // Фоточки

  const photoList = offer.photos.map((photo) => {
    const newPhoto = document.createElement('img');
    newPhoto.classList.add('popup__photo');
    newPhoto.src = photo;
    newPhoto.width = '45';
    newPhoto.height = '40';
    newPhoto.alt = 'Фотография жилья';
    return newPhoto;
  });

  while (offerPhotos.firstChild) {
    offerPhotos.removeChild(offerPhotos.firstChild);
  }
  photoList.map((photo) => offerPhotos.appendChild(photo));
  if (photoList.length === 0) {
    offerPhotos.classList.add('visually-hidden');
  }

  // Аватарка

  const avatar = offerCards.querySelector('.popup__avatar');
  avatar.src = author.avatar;
  if (author.avatar.length === 0) {
    avatar.classList.add('visually-hidden');
  }

  return offerCards;
};

export {objectGenerationCards};
