import { combineReducers } from 'redux';

import monthReducer from './month/month.reducer';
import formReducer from './form/form.reducer';

const rootReducer = combineReducers({
  month: monthReducer,
  form: formReducer,
});

export default rootReducer;
