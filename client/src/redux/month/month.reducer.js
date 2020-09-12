import { MonthTypes } from './month.types';

const INITAL_STATE = {
  monthData: [],
  currentMonth: {
    monthName: '',
    amountOfDays: 0,
    // currentDay: 0,
    days: [],
    totalPoints: 0,
  },
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

const saveToStorage = (state, name, data) => {
  if (name && data) {
    localStorage.setItem(name, JSON.stringify(data));
    return;
  } else {
    localStorage.setItem(
      state.currentMonth.monthName,
      JSON.stringify(state.currentMonth)
    );
  }
};

const replaceMonthData = (state) => {
  const f = filterMonth(state);
  const m = getIndexOfMonth(f, state);
  state.monthData.splice(m, 1, state.currentMonth);
};

const monthReducer = (state = INITAL_STATE, action) => {
  let filteredDay, index, filteredTask, taskIndex, filteredMonth, monthIndex;
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

    case MonthTypes.ADD_POINTS:
      filteredDay = filterDay(state, action);
      filteredDay[0].totalPoints += parseInt(action.payload.amount);
      state.currentMonth.totalPoints =
        parseInt(state.currentMonth.totalPoints) +
        parseInt(action.payload.amount);

      replaceMonthData(state);

      saveToStorage(state);
      return {
        ...state,
      };
    case MonthTypes.REMOVE_POINTS:
      filteredDay = filterDay(state, action);
      filteredDay[0].totalPoints -= parseInt(action.payload.amount);
      state.currentMonth.totalPoints =
        parseInt(state.currentMonth.totalPoints) -
        parseInt(action.payload.amount);
      replaceMonthData(state);
      saveToStorage(state);
      return {
        ...state,
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
      const i = state.monthData.indexOf(filteredMonth);
      //replace it
      state.monthData.splice(i, 1, action.payload);
      //save it to localStorage
      saveToStorage(null, filteredMonth.monthName, action.payload);
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
