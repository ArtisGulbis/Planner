import { combineReducers } from 'redux';

import monthReducer from './month/month.reducer';
import formReducer from './form/form.reducer';
import categoriesReducer from './categories/categories.reducer';

const rootReducer = combineReducers({
  month: monthReducer,
  form: formReducer,
  categories: categoriesReducer,
});

export default rootReducer;
