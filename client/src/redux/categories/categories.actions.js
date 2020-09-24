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
