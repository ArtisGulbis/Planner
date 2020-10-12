import moment from 'moment';

export const currentYear = moment().format('YYYY');

export const loadStorageData = () => {
  return JSON.parse(localStorage.getItem(currentYear));
};

export const saveToStorage = (data) => {
  localStorage.setItem(currentYear, JSON.stringify(data));
};
