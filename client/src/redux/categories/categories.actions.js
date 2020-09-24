import { CategoriesTypes, defaultCategoryData } from './categories.types';

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
  const name = 'categories';
  const data = JSON.parse(localStorage.getItem(name));
  if (!data) {
    localStorage.setItem(name, JSON.stringify(defaultCategoryData));
    dispatch({
      type: CategoriesTypes.LOAD_CATEGORY_DATA,
      payload: defaultCategoryData,
    });
  } else {
    dispatch({ type: CategoriesTypes.LOAD_CATEGORY_DATA, payload: data });
  }
};

export const addNewCategory = (categoryName) => (dispatch) => {
  const newCategory = { name: categoryName, time: { hour: 0, minute: 0 } };

  dispatch({ type: CategoriesTypes.ADD_NEW_CATEGORY, payload: newCategory });
};

export const removeCategory = (category) => (dispatch) => {
  dispatch({ type: CategoriesTypes.REMOVE_CATEGORY, payload: { category } });
};
