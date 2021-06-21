import {objectGeneration} from './modules/data-services.js';
import {objectGenerationCards} from './modules/generate-similar-cards.js';
import {getDisabledForm, getIncludedForm} from './modules/form-activation.js';
import {form} from './modules/form.js';

const OBJECT_GENERATION_COUNT = 10;
const generations = objectGeneration(OBJECT_GENERATION_COUNT);
const cards = generations.map((generation) => objectGenerationCards(generation));
const canvas = document.querySelector('.map__canvas');

canvas.append(cards[0]);

// Проверка
window.addEventListener('DOMContentLoaded', () => {
  getDisabledForm();
  document.body.addEventListener('click', getIncludedForm);
});

form();
