import { UserSettingsTypes } from './userSettings.types';

const INITIAL_STATE = {};

const userSettings = 'userSettings';

const userSettingsReducer = (state = INITIAL_STATE, action) => {
  let data;

  const saveToStorage = (data) => {
    localStorage.setItem(userSettings, JSON.stringify(data));
  };

  switch (action.type) {
    case UserSettingsTypes.LOAD_USER_SETTINGS:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };

    case UserSettingsTypes.CHANGE_SHOW_CARDS:
      data = JSON.parse(localStorage.getItem(userSettings));
      data.hideCards = action.payload;
      saveToStorage(data);
      return {
        ...state,
        hideCards: action.payload,
      };
    default:
      return state;
  }
};

export default userSettingsReducer;
