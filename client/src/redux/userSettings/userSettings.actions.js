import { UserSettingsTypes } from './userSettings.types';
import { currentYear } from '../utils';

const defaultSettings = { hideCards: false };

const loadStorageData = () => {
  return JSON.parse(localStorage.getItem(currentYear));
};

const saveToLocalStorage = (data) => {
  localStorage.setItem(currentYear, JSON.stringify(data));
};

export const loadUserSettings = () => (dispatch) => {
  const storageData = loadStorageData();
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
  const storageData = loadStorageData();
  storageData.userSettings.hideCards = bool;
  saveToLocalStorage(storageData);

  dispatch({ type: UserSettingsTypes.CHANGE_SHOW_CARDS, payload: bool });
};
