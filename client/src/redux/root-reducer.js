import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import monthReducer from './month/month.reducer';
import formReducer from './form/form.reducer';

const persistConfig = {
  key: '2',
  storage,
};

const rootReducer = combineReducers({
  month: monthReducer,
  form: formReducer,
});

export default persistReducer(persistConfig, rootReducer);
