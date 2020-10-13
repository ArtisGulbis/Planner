import { MonthTypes } from './month.types';
import moment from 'moment';
import { saveToStorage } from '../utils';

const INITAL_STATE = {
  monthData: [],
  currentMonth: {
    nameOfMonth: '',
    amountOfDays: 0,
    days: [],
  },
};

const sortMonths = (data) => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(moment().month(i).format('MMMM'));
  }
  data.sort((a, b) => {
    return months.indexOf(a.nameOfMonth) - months.indexOf(b.nameOfMonth);
  });
};

const filterDay = (state, action) => {
  return state.currentMonth.days.filter(
    (day) => day.dayNr === action.payload.number
  );
};

// const filterMonth = (state) => {
//   return state.monthData.filter(
//     (month) => month.nameOfMonth === state.currentMonth.nameOfMonth
//   );
// };

const getIndexfOfDay = (state, day) => {
  return state.currentMonth.days.indexOf(day);
};

const filterTask = (day, action) => {
  return day.tasks.filter((task) => task.id === action.payload.id);
};

const monthReducer = (state = INITAL_STATE, action) => {
  let filteredDay,
    index,
    filteredTask,
    currentMonth,
    taskIndex,
    storageData,
    newData,
    data;
  switch (action.type) {
    case MonthTypes.ADD_TASK_TO_DAY:
      storageData = action.payload.storageData;
      filteredDay = filterDay(state, action);
      index = getIndexfOfDay(state, filteredDay[0]);
      let day = filteredDay[0];
      day.tasks.push(action.payload.task);
      state.currentMonth.days.splice(index, 1, day);
      newData = storageData.monthData.map((el) =>
        el.nameOfMonth === state.currentMonth.nameOfMonth
          ? state.currentMonth
          : el
      );
      storageData.monthData = newData;
      saveToStorage(storageData);
      return {
        ...state,
        currentMonth: {
          ...state.currentMonth,
          days: [...state.currentMonth.days],
        },
      };
    case MonthTypes.LOAD_MONTH_DATA:
      ({ data, currentMonth } = action.payload);
      sortMonths(data);
      return {
        ...state,
        monthData: [...data],
        currentMonth: { ...currentMonth },
      };
    case MonthTypes.DELETE_TASK:
      storageData = action.payload.storageData;
      filteredDay = filterDay(state, action);
      index = getIndexfOfDay(state, filteredDay[0]);
      filteredTask = filterTask(filteredDay[0], action);
      taskIndex = filteredDay[0].tasks.indexOf(filteredTask[0]);
      filteredDay[0].tasks.splice(taskIndex, 1);
      newData = storageData.monthData.map((el) => {
        if (el.nameOfMonth === state.currentMonth.nameOfMonth) {
          return {
            ...el,
            days: el.days.map((el) =>
              el.dayNr === filteredDay[0].dayNr ? filteredDay[0] : el
            ),
          };
        }
        return el;
      });
      storageData.monthData = newData;
      saveToStorage(storageData);
      return {
        ...state,
        currentMonth: {
          ...state.currentMonth,
          days: [...state.currentMonth.days],
        },
      };
    case MonthTypes.SET_COMPLETED:
      storageData = action.payload.storageData;
      filteredDay = filterDay(state, action);
      index = getIndexfOfDay(state, filteredDay[0]);
      filteredTask = filterTask(filteredDay[0], action);
      filteredTask[0].completed = action.payload.completed;
      newData = storageData.monthData.map((month) =>
        month.nameOfMonth === state.currentMonth.nameOfMonth
          ? {
              ...month,
              days: month.days.map((day) =>
                day.dayNr === filteredDay[0].dayNr ? filteredDay[0] : day
              ),
            }
          : month
      );
      storageData.monthData = newData;
      saveToStorage(storageData);
      return {
        ...state,
        currentMonth: {
          ...state.currentMonth,
          days: [...state.currentMonth.days],
        },
      };
    case MonthTypes.RESET_MONTH:
      ({ data, storageData } = action.payload);
      newData = storageData.monthData.map((month) =>
        month.nameOfMonth === data.nameOfMonth ? data : month
      );
      storageData.monthData = newData;
      saveToStorage(storageData);
      return {
        ...state,
        monthData: [...storageData.monthData],
        currentMonth: {
          ...data,
        },
      };
    case MonthTypes.SWITCH_MONTH:
      //nm -> nextMonth
      const nm = state.monthData.filter(
        (month) => month.nameOfMonth === action.payload
      );

      const nextMonth = nm[0];

      return {
        ...state,
        currentMonth: {
          ...nextMonth,
        },
      };
    default:
      return state;
  }
};

export default monthReducer;
