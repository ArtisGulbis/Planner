import moment from 'moment';

const defaultCategories = ['Guitar', 'Fitness', 'Studying', 'Gaming', 'None'];

export const createDefaultData = () => {
  const defaultCategoryData = [];
  const months = 12;
  for (let i = moment().get('month'); i < months; i++) {
    const nameOfMonth = moment().month(i).format('MMMM');
    const a = createData(nameOfMonth);

    defaultCategoryData.push(a);
  }
  return defaultCategoryData;
};

export const createData = (nameOfMonth) => {
  return {
    nameOfMonth: nameOfMonth,
    monthCategories: defaultCategories.map((el) => ({
      categoryName: el,
      time: { hour: 0, minute: 0 },
    })),
  };
};
