import { CategoriesTypes } from './categories.types';
import { saveToStorage } from '../utils';

const INITIAL_STATE = {
  data: [],
};

const formatTime = (currentTime, timeToAdd, type) => {
  const hourMark = 59;
  const finalTime = { hour: 0, minute: 0 };

  //currentTimeHour, currentTimeMinute
  const [cth, ctm] = [currentTime.hour, currentTime.minute];
  //timeToAddHour, timeToAddMinute
  const [ttah, ttam] = [timeToAdd.hours, timeToAdd.minutes];

  if (type === 'add') {
    //add hours and minutes
    finalTime.hour += cth + ttah;
    finalTime.minute += ctm + ttam;

    //check if minutes pass 59 min
    if (finalTime.minute > hourMark) {
      finalTime.hour += Math.trunc(finalTime.minute / 60);
      finalTime.minute = finalTime.minute % 60;
    }

    return finalTime;
  } else {
    //convert current hours into minutes
    let hours = cth * 60;
    //add current minutes with those hour minutes
    let minutes = ctm + hours;
    //remove minutes to "add" from current minutes and convert hours too
    minutes -= ttam + ttah * 60;
    //convert back to hours and minutes
    finalTime.hour = Math.trunc(minutes / 60);
    finalTime.minute = minutes % 60;

    return finalTime;
  }
};
const updateTime = (month, data, category) => {
  return month.monthCategories.map((el) =>
    el.categoryName === category
      ? { ...el, time: { hour: data.hour, minute: data.minute } }
      : el
  );
};

const filterCategory = (month, category) => {
  return month.monthCategories.filter((el) => el.categoryName === category);
};

const filterMonth = (state, month) => {
  return state.data.filter((el) => el.nameOfMonth === month);
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  let storageData,
    index,
    nameOfMonth,
    category,
    hours,
    minutes,
    filteredCategory,
    newTime,
    newData,
    filteredMonth,
    data;
  switch (action.type) {
    case CategoriesTypes.LOAD_CATEGORY_DATA:
      return {
        ...state,
        data: [...action.payload],
      };

    case CategoriesTypes.ADD_NEW_CATEGORY:
      ({ storageData } = action.payload);
      [filteredMonth] = filterMonth(
        state,
        action.payload.newCategory.nameOfMonth
      );
      filteredMonth.monthCategories.push(action.payload.newCategory.category);
      index = storageData.categoryData.findIndex(
        (el) => el.nameOfMonth === filteredMonth.nameOfMonth
      );
      storageData.categoryData.splice(index, 1, filteredMonth);
      saveToStorage(storageData);
      return {
        ...state,
        data: [...storageData.categoryData],
      };

    case CategoriesTypes.REMOVE_CATEGORY:
      ({ category, nameOfMonth, storageData } = action.payload);
      [filteredMonth] = filterMonth(state, nameOfMonth);
      [filteredCategory] = filterCategory(filteredMonth, category.categoryName);
      filteredMonth.monthCategories = filteredMonth.monthCategories.filter(
        (el) => el.categoryName !== category.categoryName
      );
      index = storageData.categoryData.findIndex(
        (el) => el.nameOfMonth === filteredMonth.nameOfMonth
      );
      storageData.categoryData.splice(index, 1, filteredMonth);
      saveToStorage(storageData);
      return {
        ...state,
        data: [...storageData.categoryData],
      };

    case CategoriesTypes.ADD_TIME_TO_CATEGORY:
      ({ category, hours, minutes, nameOfMonth, storageData } = action.payload);
      [filteredMonth] = filterMonth(state, nameOfMonth);
      [filteredCategory] = filterCategory(filteredMonth, category);
      newTime = formatTime(filteredCategory.time, { hours, minutes }, 'add');
      newData = updateTime(filteredMonth, newTime, category);
      filteredMonth.monthCategories = [...newData];
      newData = storageData.categoryData.map((el) =>
        el.nameOfMonth === filteredMonth.nameOfMonth ? filteredMonth : el
      );
      storageData.categoryData = newData;
      saveToStorage(storageData);
      return {
        ...state,
        data: [
          ...state.data.map((el) =>
            el.nameOfMonth === filteredMonth.nameOfMonth ? filteredMonth : el
          ),
        ],
      };

    case CategoriesTypes.REMOVE_TIME_FROM_CATEGORY:
      ({ category, hours, minutes, nameOfMonth, storageData } = action.payload);
      [filteredMonth] = filterMonth(state, nameOfMonth);
      [filteredCategory] = filterCategory(filteredMonth, category);
      newTime = formatTime(filteredCategory.time, { hours, minutes });
      newData = updateTime(filteredMonth, newTime, category);
      filteredMonth.monthCategories = [...newData];
      newData = storageData.categoryData.map((month) =>
        month.nameOfMonth === filteredMonth.nameOfMonth ? filteredMonth : month
      );
      storageData.categoryData = newData;
      saveToStorage(storageData);
      return {
        ...state,
        data: state.data.map((el) =>
          el.nameOfMonth === filteredMonth.nameOfMonth ? filteredMonth : el
        ),
      };

    case CategoriesTypes.RESET_CATEGORY_DATA:
      ({ data, storageData } = action.payload);

      newData = storageData.categoryData.map((month) =>
        month.nameOfMonth === data.nameOfMonth ? data : month
      );
      storageData.categoryData = newData;
      saveToStorage(storageData);
      return {
        ...state,
        data: [...storageData.categoryData],
      };
    default:
      return state;
  }
};

export default categoriesReducer;
