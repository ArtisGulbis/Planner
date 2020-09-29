import { UserSettingsTypes } from './userSettings.types';

const defaultSettings = {
  hideCards: false,
};

export const loadUserSettings = () => (dispatch) => {
  let userSetting = JSON.parse(localStorage.getItem('userSettings'));

  if (!userSetting) {
    userSetting = defaultSettings;
    dispatch({
      type: UserSettingsTypes.LOAD_USER_SETTINGS,
      payload: userSetting,
    });
  }
  dispatch({
    type: UserSettingsTypes.LOAD_USER_SETTINGS,
    payload: userSetting,
  });
};

export const changeShowCards = (bool) => (dispatch) => {
  dispatch({ type: UserSettingsTypes.CHANGE_SHOW_CARDS, payload: bool });
};
