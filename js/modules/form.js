const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect = mapFilters.querySelectorAll('select');
const mapFiltersFieldset = mapFilters.querySelector('fieldset');
const formFieldsets = form.querySelectorAll('fieldset');

const getDisabledForm = () => {
  form.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  formFieldsets.forEach((fieldsets) => fieldsets.disabled = true);
  mapFiltersSelect.forEach((elements) => elements.disabled = true);
  mapFiltersFieldset.disabled = true;
};

const getIncludedForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  formFieldsets.forEach((fieldsets) => fieldsets.disabled = false);
  mapFiltersSelect.forEach((elements) => elements.disabled = false);
  mapFiltersFieldset.disabled = false;
};

export {getDisabledForm, getIncludedForm};
