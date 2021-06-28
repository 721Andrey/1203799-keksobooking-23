import {generations} from './data-services.js';
import {objectGenerationCards} from './generate-similar-cards.js';
import {getDisabledForm, getIncludedForm} from './form-activation.js';

getDisabledForm();

const address = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const DECIMAL_DIGITS = 5;

const FIND_THE_CENTER = {
  lat: 35.68272,
  lng: 139.75871,
};

const pinSize = {
  width: 52,
  height: 52,
};

const iconSize = {
  width: 40,
  height: 40,
};

const map = L.map('map-canvas')
  .on('load', () => {
    getIncludedForm();
  })
  .setView({
    lat: FIND_THE_CENTER.lat,
    lng: FIND_THE_CENTER.lng,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const pinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [pinSize.width, pinSize.height],
  iconAnchor: [pinSize.width / 2, pinSize.height],
  shadowUrl: 'leaflet/images/marker-shadow.png',
  shadowSize: [pinSize.width * 2, pinSize.height * 2],
  shadowAnchor: [pinSize.width / 2, pinSize.height * 2],
});

const pinMarker = L.marker(
  {
    lat: FIND_THE_CENTER.lat,
    lng: FIND_THE_CENTER.lng,
  },
  {
    draggable: true,
    icon: pinIcon,
  },
);

pinMarker.addTo(map);

pinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `
  ${lat.toFixed(DECIMAL_DIGITS)}, ${lng.toFixed(DECIMAL_DIGITS)}
  `;
});

resetButton.addEventListener('click', () => {
  pinMarker.setLatLng({
    lat: FIND_THE_CENTER.lat,
    lng: FIND_THE_CENTER.lng,
  });

  map.setView({
    lat: FIND_THE_CENTER.lat,
    lng: FIND_THE_CENTER.lng,
  }, 13);
});

generations.forEach((point) => {
  const {location: {lat, lng}} = point;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [iconSize.width, iconSize.height],
    iconAnchor: [iconSize.width/2, iconSize.height],
    shadowUrl: 'leaflet/images/marker-shadow.png',
    shadowSize: [iconSize.width * 2, iconSize.height * 2],
    shadowAnchor: [iconSize.width / 2, iconSize.height * 2],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      objectGenerationCards(point),
      {
        keepInView: true,
      });
});
