import moment from 'moment';

export const CategoriesTypes = {
  ADD_NEW_CATEGORY: 'ADD_NEW_CATEGORY',
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
  ADD_TIME_TO_CATEGORY: 'ADD_TIME_TO_CATEGORY',
  REMOVE_TIME_FROM_CATEGORY: 'REMOVE_TIME_FROM_CATEGORY',
  LOAD_CATEGORY_DATA: 'LOAD_CATEGORY_DATA',
};

const defaultCategories = ['Guitar', 'Fitness', 'Studying', 'Gaming'];

export const createDefaultData = () => {
  const defaultCategoryData = [];
  const months = 12;
  for (let i = moment().get('month'); i < months; i++) {
    const monthName = moment().month(i).format('MMMM');
    const a = {
      month: monthName,
      categories: defaultCategories.map((el) => ({
        name: el,
        time: { hour: 0, minute: 0 },
      })),
    };

    defaultCategoryData.push(a);
  }
  return defaultCategoryData;
};
