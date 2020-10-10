import { CategoriesTypes } from './categories.types';

const INITIAL_STATE = {
  cat: [],
};

const storageName = 'categories';

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

const saveToStorage = (data) => {
  localStorage.setItem(`${storageName}-${data.month}`, JSON.stringify(data));
};

const updateTime = (month, data, category) => {
  return month.categories.map((el) =>
    el.name === category
      ? { ...el, time: { hour: data.hour, minute: data.minute } }
      : el
  );
};

const filterCategory = (month, category) => {
  return month.categories.filter((el) => el.name === category);
};

const filterMonth = (state, month) => {
  return state.cat.filter((el) => el.month === month);
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  let storageData,
    categories,
    month,
    category,
    hours,
    minutes,
    filteredCategory,
    newTime,
    newData,
    monthName,
    filteredMonth;
  switch (action.type) {
    case CategoriesTypes.LOAD_CATEGORY_DATA:
      return {
        ...state,
        cat: [...action.payload],
      };

    case CategoriesTypes.ADD_NEW_CATEGORY:
      [filteredMonth] = filterMonth(state, action.payload.month);
      filteredMonth.categories.push(action.payload.category);
      saveToStorage(filteredMonth);
      return {
        ...state,
      };

    case CategoriesTypes.REMOVE_CATEGORY:
      ({ categories, category, month } = action.payload);
      console.log(categories);
      [filteredMonth] = filterMonth(state, month);
      [filteredCategory] = filterCategory(filteredMonth, category);
      storageData = JSON.parse(localStorage.getItem(`${storageName}-${month}`));
      const i = storageData.categories.findIndex((el) => el.name === category);
      storageData.categories.splice(i, 1);
      saveToStorage(storageData);
      return {
        ...state,
        cat: [storageData],
      };

    case CategoriesTypes.ADD_TIME_TO_CATEGORY:
      ({ category, hours, minutes, monthName } = action.payload);
      [filteredMonth] = filterMonth(state, monthName);
      [filteredCategory] = filterCategory(filteredMonth, category);
      newTime = formatTime(filteredCategory.time, { hours, minutes }, 'add');
      newData = updateTime(filteredMonth, newTime, category);
      filteredMonth.categories = [...newData];
      saveToStorage(filteredMonth);
      return {
        ...state,
        cat: state.cat.map((el) =>
          el.month === filteredMonth.month ? filteredMonth : el
        ),
      };

    case CategoriesTypes.REMOVE_TIME_FROM_CATEGORY:
      ({ category, hours, minutes, monthName } = action.payload);
      [filteredMonth] = filterMonth(state, monthName);
      [filteredCategory] = filterCategory(filteredMonth, category);
      newTime = formatTime(filteredCategory.time, { hours, minutes });
      newData = updateTime(filteredMonth, newTime, category);
      filteredMonth.categories = [...newData];
      saveToStorage(filteredMonth);
      return {
        ...state,
        cat: state.cat.map((el) =>
          el.month === filteredMonth.month ? filteredMonth : el
        ),
      };

    case CategoriesTypes.RESET_CATEGORY_DATA:
      saveToStorage(action.payload);
      return {
        ...state,
      };

    case CategoriesTypes.SWITCH_CATEGORIES:
      //nextCategory
      storageData = JSON.parse(
        localStorage.getItem(`${storageName}-${action.payload}`)
      );

      return {
        ...state,
        cat: [storageData],
      };

    default:
      return state;
  }
};

export default categoriesReducer;
