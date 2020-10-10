import { MonthTypes } from './month.types';
import moment from 'moment';

const INITAL_STATE = {
  monthData: [],
  currentMonth: {
    monthName: '',
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
    return months.indexOf(a.monthName) - months.indexOf(b.monthName);
  });
};

const filterDay = (state, action) => {
  return state.currentMonth.days.filter(
    (day) => day.dayNr === action.payload.number
  );
};

const filterMonth = (state) => {
  return state.monthData.filter(
    (month) => month.monthName === state.currentMonth.monthName
  );
};

const getIndefOfDay = (state, day) => {
  return state.currentMonth.days.indexOf(day);
};

const getIndexOfMonth = (fm, state) => {
  return state.monthData.indexOf(fm[0]);
};

const filterTask = (day, action) => {
  return day.tasks.filter((task) => task.id === action.payload.id);
};

const saveToStorage = (state, otherData) => {
  if (otherData) {
    return localStorage.setItem(otherData.monthName, JSON.stringify(otherData));
  }

  localStorage.setItem(
    state.currentMonth.monthName,
    JSON.stringify(state.currentMonth)
  );
};

const replaceMonthData = (state) => {
  const f = filterMonth(state);
  const m = getIndexOfMonth(f, state);
  state.monthData.splice(m, 1, state.currentMonth);
};

const monthReducer = (state = INITAL_STATE, action) => {
  let filteredDay, index, filteredTask, taskIndex, filteredMonth;
  switch (action.type) {
    case MonthTypes.ADD_TASK_TO_DAY:
      filteredDay = filterDay(state, action);
      index = getIndefOfDay(state, filteredDay[0]);
      let day = filteredDay[0];
      day.tasks.push(action.payload.task);
      state.currentMonth.days.splice(index, 1, day);
      saveToStorage(state);
      return {
        ...state,
        currentMonth: {
          ...state.currentMonth,
          days: [...state.currentMonth.days],
        },
      };

    case MonthTypes.SET_DATA:
      const { data, currentMonth } = action.payload;
      sortMonths(data);
      return {
        ...state,
        monthData: [...data],
        currentMonth: { ...currentMonth },
      };

    case MonthTypes.DELETE_TASK:
      filteredDay = filterDay(state, action);
      index = getIndefOfDay(state, filteredDay[0]);
      filteredTask = filterTask(filteredDay[0], action);
      taskIndex = filteredDay[0].tasks.indexOf(filteredTask[0]);
      filteredDay[0].tasks.splice(taskIndex, 1);
      if (filteredDay[0].totalPoints !== 0) {
        filteredDay[0].totalPoints -= filteredTask[0].points;
      }
      state.currentMonth.days.splice(index, 1, filteredDay[0]);
      state.currentMonth.totalPoints = filteredTask[0].completed
        ? parseInt(state.currentMonth.totalPoints) -
          parseInt(filteredTask[0].points)
        : state.currentMonth.totalPoints;
      replaceMonthData(state);
      saveToStorage(state);
      return {
        ...state,
        currentMonth: {
          ...state.currentMonth,
          days: [...state.currentMonth.days],
        },
      };
    case MonthTypes.SET_COMPLETED:
      filteredDay = filterDay(state, action);
      index = getIndefOfDay(state, filteredDay[0]);
      filteredTask = filterTask(filteredDay[0], action);
      filteredTask[0].completed = action.payload.completed;
      saveToStorage(state);
      return {
        ...state,
        currentMonth: {
          ...state.currentMonth,
          days: [...state.currentMonth.days],
        },
      };

    case MonthTypes.RESET_MONTH:
      //filter month to replace
      filteredMonth = filterMonth(state);
      //index of the month to be replaced in state
      const i = state.monthData.findIndex(
        (month) => month.monthName === filteredMonth[0].monthName
      );
      //replace it
      state.monthData.splice(i, 1, action.payload);
      //save it to localStorage
      saveToStorage(state, action.payload);
      return {
        ...state,
        monthData: [...state.monthData],
        currentMonth: {
          ...action.payload,
        },
      };
    case MonthTypes.SWITCH_MONTH:
      //nm -> nextMonth
      const nm = state.monthData.filter(
        (month) => month.monthName === action.payload
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
