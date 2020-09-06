import { MonthTypes } from './month.types';

const INITAL_STATE = {
  name: '',
  amountOfDays: 0,
  currentDay: 0,
  days: [],
  totalPoints: 0,
};

const filterDay = (state, action) => {
  return state.days.filter((day) => day.dayNr === action.payload.number);
};

const getIndex = (state, day) => {
  return state.days.indexOf(day);
};

const filterTask = (day, action) => {
  return day.tasks.filter((task) => task.id === action.payload.id);
};

const saveToStorage = (state) => {
  localStorage.setItem(state.name, JSON.stringify(state));
};

const monthReducer = (state = INITAL_STATE, action) => {
  let filteredDay, index, filteredTask, taskIndex;
  switch (action.type) {
    case MonthTypes.SET_CURRENT_MONTH:
      return {
        ...state,
        name: action.payload,
      };
    case MonthTypes.SET_DAYS:
      return {
        ...state,
        days: [...action.payload],
      };

    case MonthTypes.ADD_TASK_TO_DAY:
      filteredDay = filterDay(state, action);
      index = getIndex(state, filteredDay[0]);
      let day = filteredDay[0];
      day.tasks.push(action.payload.task);
      state.days.splice(index, 1, day);
      saveToStorage(state);
      return {
        ...state,
        days: [...state.days],
      };

    case MonthTypes.SET_DATA:
      console.log('Reducer ----------');
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };

    case MonthTypes.DELETE_TASK:
      filteredDay = filterDay(state, action);
      index = getIndex(state, filteredDay[0]);
      filteredTask = filterTask(filteredDay[0], action);
      taskIndex = filteredDay[0].tasks.indexOf(filteredTask[0]);
      filteredDay[0].tasks.splice(taskIndex, 1);
      if (filteredDay[0].totalPoints !== 0) {
        filteredDay[0].totalPoints -= filteredTask[0].points;
      }
      state.days.splice(index, 1, filteredDay[0]);
      saveToStorage(state);
      return {
        ...state,
        days: [...state.days],
        totalPoints: filteredTask[0].completed
          ? parseInt(state.totalPoints) - parseInt(filteredTask[0].points)
          : state.totalPoints,
      };

    case MonthTypes.ADD_POINTS:
      filteredDay = filterDay(state, action);
      filteredDay[0].totalPoints += parseInt(action.payload.amount);
      state.totalPoints =
        parseInt(state.totalPoints) + parseInt(action.payload.amount);
      saveToStorage(state);
      return {
        ...state,
      };
    case MonthTypes.REMOVE_POINTS:
      filteredDay = filterDay(state, action);
      filteredDay[0].totalPoints -= parseInt(action.payload.amount);
      state.totalPoints =
        parseInt(state.totalPoints) - parseInt(action.payload.amount);
      saveToStorage(state);
      return {
        ...state,
      };
    case MonthTypes.SET_COMPLETED:
      filteredDay = filterDay(state, action);
      index = getIndex(state, filteredDay[0]);
      filteredTask = filterTask(filteredDay[0], action);
      filteredTask[0].completed = action.payload.completed;
      saveToStorage(state);
      return {
        ...state,
        days: [...state.days],
      };

    default:
      return state;
  }
};

export default monthReducer;
