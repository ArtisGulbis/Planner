import moment from 'moment';

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
