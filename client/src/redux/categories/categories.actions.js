import { CategoriesTypes } from './categories.types';
import { createDefaultData, createNewDataFormMonth } from './categories.utils';
import moment from 'moment';
import { currentYear } from '../utils';

export const addTimeToCategory = (data) => (dispatch) => {
  dispatch({
    type: CategoriesTypes.ADD_TIME_TO_CATEGORY,
    payload: data,
  });
};

export const removeTimeFromCategory = (data) => (dispatch) => {
  dispatch({ type: CategoriesTypes.REMOVE_TIME_FROM_CATEGORY, payload: data });
};

export const loadCategoryData = () => (dispatch) => {
  // const name = 'categories';
  const monthNames = [];

  let obj = [];

  for (let i = moment().get('month'); i < 12; i++) {
    monthNames.push(moment().month(i).format('MMMM'));
  }

  const data = JSON.parse(localStorage.getItem(currentYear));
  console.log(data);
  if (!data?.categoryData) {
    const defaultData = createDefaultData();
    obj = [...defaultData];
    data.categoryData = [...obj];
    localStorage.setItem(currentYear, JSON.stringify(data));
  }

  dispatch({
    type: CategoriesTypes.LOAD_CATEGORY_DATA,
    payload: data.categoryData,
  });
  // const data = monthNames.map((el) =>
  //   JSON.parse(localStorage.getItem(`${name}-${el}`))
  // );

  // if (data.includes(null)) {
  //   const d = createDefaultData();
  //   for (let i = 0; i < d.length; i++) {
  //     localStorage.setItem(`${name}-${d[i].month}`, JSON.stringify(d[i]));
  //   }
  //   dispatch({
  //     type: CategoriesTypes.LOAD_CATEGORY_DATA,
  //     payload: d,
  //   });
  // } else {
  //   dispatch({ type: CategoriesTypes.LOAD_CATEGORY_DATA, payload: data });
  // }
};

export const addNewCategory = ({ newCategoryName, monthName }) => (
  dispatch
) => {
  const newCategory = {
    month: monthName,
    category: { name: newCategoryName, time: { hour: 0, minute: 0 } },
  };

  dispatch({ type: CategoriesTypes.ADD_NEW_CATEGORY, payload: newCategory });
};

export const removeCategory = (data, category) => (dispatch) => {
  dispatch({
    type: CategoriesTypes.REMOVE_CATEGORY,
    payload: { ...data, category },
  });
};

export const resetCategoryData = (monthName) => (dispatch) => {
  const data = createNewDataFormMonth(monthName);
  dispatch({ type: CategoriesTypes.RESET_CATEGORY_DATA, payload: data });
};

export const switchCategories = (name) => (dispatch) => {
  dispatch({ type: CategoriesTypes.SWITCH_CATEGORIES, payload: name });
};
