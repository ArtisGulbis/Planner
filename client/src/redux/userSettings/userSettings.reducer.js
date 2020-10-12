import { UserSettingsTypes } from './userSettings.types';

const INITIAL_STATE = { hideCards: false };

const userSettingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserSettingsTypes.LOAD_USER_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };

    case UserSettingsTypes.CHANGE_SHOW_CARDS:
      return {
        ...state,
        hideCards: action.payload,
      };
    default:
      return state;
  }
};

export default userSettingsReducer;
