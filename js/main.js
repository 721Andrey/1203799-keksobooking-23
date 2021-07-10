import './modules/load-map.js';
import {setPointsMap} from './modules/load-map.js';
import './modules/form.js';
import {setFormSubmit} from './modules/form.js';
import {getData} from './modules/api.js';
import {showAlert} from './modules/message-error.js';

getData(setPointsMap, showAlert);
setFormSubmit();
