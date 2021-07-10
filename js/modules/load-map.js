import {objectGenerationCards} from './generate-similar-cards.js';
import {getDisabledForm, getIncludedForm} from './form-activation.js';

getDisabledForm();

const address = document.querySelector('#address');
const DECIMAL_DIGITS = 5;
const ZOOM = 13;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

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
  }, ZOOM);

L.tileLayer(
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
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

const getAddress = (lat, lng) => address.value = `
  ${lat.toFixed(DECIMAL_DIGITS)}, ${lng.toFixed(DECIMAL_DIGITS)}
`;
getAddress(FIND_THE_CENTER.lat, FIND_THE_CENTER.lng);

pinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  getAddress(lat, lng);
});

const setInitialAddress = () => {
  const { lat, lng } = FIND_THE_CENTER;
  pinMarker.setLatLng({
    lat,
    lng,
  });

  map.setView({
    lat,
    lng,
  }, ZOOM);
};

const setPointsMap = (generations) => {
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
};

export {setInitialAddress, setPointsMap};
