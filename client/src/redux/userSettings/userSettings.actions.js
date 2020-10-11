import { UserSettingsTypes } from './userSettings.types';
import { currentYear } from '../utils';

const defaultSettings = { hideCards: false };

export const loadUserSettings = () => (dispatch) => {
  const storageData = JSON.parse(localStorage.getItem(currentYear));
  console.log(storageData);

  if (!storageData?.userSettings) {
    storageData.userSettings = { ...defaultSettings };
    localStorage.setItem(currentYear, JSON.stringify(storageData));
    dispatch({
      type: UserSettingsTypes.LOAD_USER_SETTINGS,
      payload: storageData.userSettings,
    });
    return;
  }
  dispatch({
    type: UserSettingsTypes.LOAD_USER_SETTINGS,
    payload: storageData.userSettings,
  });
};

export const changeShowCards = (bool) => (dispatch) => {
  dispatch({ type: UserSettingsTypes.CHANGE_SHOW_CARDS, payload: bool });
};
