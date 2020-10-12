import { CategoriesTypes } from './categories.types';
import { createDefaultData, createData } from './categories.utils';
import moment from 'moment';
import { currentYear, loadStorageData } from '../utils';

export const addTimeToCategory = (data) => (dispatch) => {
  const { category, hours, minutes, nameOfMonth } = data;
  const storageData = loadStorageData();
  dispatch({
    type: CategoriesTypes.ADD_TIME_TO_CATEGORY,
    payload: { category, hours, minutes, nameOfMonth, storageData },
  });
};

export const removeTimeFromCategory = (data) => (dispatch) => {
  const { category, hours, minutes, nameOfMonth } = data;
  const storageData = loadStorageData();
  dispatch({
    type: CategoriesTypes.REMOVE_TIME_FROM_CATEGORY,
    payload: { category, hours, minutes, nameOfMonth, storageData },
  });
};

export const loadCategoryData = () => (dispatch) => {
  const monthNames = [];

  for (let i = moment().get('month'); i < 12; i++) {
    monthNames.push(moment().month(i).format('MMMM'));
  }

  const storageData = loadStorageData();

  if (!storageData?.categoryData) {
    const defaultData = createDefaultData();
    const obj = [...defaultData];
    storageData.categoryData = [...obj];
    localStorage.setItem(currentYear, JSON.stringify(storageData));
  }

  dispatch({
    type: CategoriesTypes.LOAD_CATEGORY_DATA,
    payload: storageData.categoryData,
  });
};

export const addNewCategory = ({ newCategoryName, nameOfMonth }) => (
  dispatch
) => {
  const storageData = loadStorageData();
  const newCategory = {
    nameOfMonth,
    category: { categoryName: newCategoryName, time: { hour: 0, minute: 0 } },
  };
  dispatch({
    type: CategoriesTypes.ADD_NEW_CATEGORY,
    payload: { newCategory, storageData },
  });
};

export const removeCategory = (nameOfMonth, category) => (dispatch) => {
  const storageData = loadStorageData();
  dispatch({
    type: CategoriesTypes.REMOVE_CATEGORY,
    payload: { nameOfMonth, category, storageData },
  });
};

export const resetCategoryData = (nameOfMonth) => (dispatch) => {
  const data = createData(nameOfMonth);
  const storageData = loadStorageData();
  dispatch({
    type: CategoriesTypes.RESET_CATEGORY_DATA,
    payload: { data, storageData },
  });
};
