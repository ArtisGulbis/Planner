import { combineReducers } from 'redux';

import monthReducer from './month/month.reducer';
import formReducer from './form/form.reducer';
import categoriesReducer from './categories/categories.reducer';
import userSettingsReducer from './userSettings/userSettings.reducer';

const rootReducer = combineReducers({
  monthReducer,
  formReducer,
  categoriesReducer,
  userSettingsReducer,
});

export default rootReducer;
