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
  const [ttah, ttam] = [timeToAdd.hour, timeToAdd.minute];

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
  localStorage.setItem(storageName, JSON.stringify(data));
};

const updateData = (state, data, category) => {
  return state.cat.map((el) =>
    el.name === category
      ? { ...el, time: { hour: data.hour, minute: data.minute } }
      : el
  );
};

const filterCategory = (state, category) => {
  return state.cat.filter((el) => el.name === category);
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  let storageData, category, hour, minute, filteredCategory, newTime, newData;
  switch (action.type) {
    case CategoriesTypes.LOAD_CATEGORY_DATA:
      return {
        ...state,
        cat: [...action.payload],
      };

    case CategoriesTypes.ADD_NEW_CATEGORY:
      storageData = JSON.parse(localStorage.getItem(storageName));
      storageData.push(action.payload);

      saveToStorage(storageData);
      return {
        ...state,
        cat: [...state.cat, action.payload],
      };

    case CategoriesTypes.REMOVE_CATEGORY:
      ({ category } = action.payload);
      [filteredCategory] = filterCategory(state, category);
      storageData = JSON.parse(localStorage.getItem(storageName));
      const i = storageData.findIndex((el) => el.name === category);
      storageData.splice(i, 1);
      saveToStorage(storageData);
      return {
        ...state,
        cat: [...storageData],
      };

    case CategoriesTypes.ADD_TIME_TO_CATEGORY:
      ({ category, hour, minute } = action.payload);

      [filteredCategory] = filterCategory(state, category);

      newTime = formatTime(filteredCategory.time, { hour, minute }, 'add');

      newData = updateData(state, newTime, category);

      saveToStorage(newData);
      return {
        ...state,
        cat: [...newData],
      };

    case CategoriesTypes.REMOVE_TIME_FROM_CATEGORY:
      ({ category, hour, minute } = action.payload);

      [filteredCategory] = filterCategory(state, category);

      newTime = formatTime(filteredCategory.time, { hour, minute });

      newData = updateData(state, newTime, category);

      saveToStorage(newData);
      return {
        ...state,
        cat: [...newData],
      };
    default:
      return state;
  }
};

export default categoriesReducer;
