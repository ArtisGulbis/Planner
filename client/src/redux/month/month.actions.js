import { MonthTypes } from './month.types';
import moment from 'moment';

const currentMonth = moment().format('MMMM');

const createData = () => {
  const daysInMonth = moment().daysInMonth();
  const dayArray = [];
  let i = parseInt(daysInMonth);

  while (i > 0) {
    const day = {
      dayNr: i,
      totalPoints: 0,
      tasks: [],
    };
    dayArray.push(day);
    i--;
  }
  const monthData = {
    name: currentMonth,
    amountOfDays: daysInMonth,
    days: dayArray.reverse(),
    totalPoints: 0,
  };

  return monthData;
};

export const setData = () => (dispatch) => {
  let data = JSON.parse(localStorage.getItem(currentMonth));
  if (!data) {
    data = createData();

    localStorage.setItem(currentMonth, JSON.stringify(data));
    dispatch({ type: MonthTypes.SET_DATA, payload: data });
  } else {
    dispatch({ type: MonthTypes.SET_DATA, payload: data });
  }
};

export const setMonth = (name) => (dispatch) => {
  dispatch({ type: MonthTypes.SET_CURRENT_MONTH, payload: name });
};

export const setDays = (days) => (dispatch) => {
  dispatch({ type: MonthTypes.SET_DAYS, payload: days });
};

export const addTask = (task, number) => (dispatch) => {
  dispatch({ type: MonthTypes.ADD_TASK_TO_DAY, payload: { task, number } });
};

export const deleteTask = (id, number) => (dispatch) => {
  dispatch({ type: MonthTypes.DELETE_TASK, payload: { id, number } });
};

export const addPoints = (amount, number) => (dispatch) => {
  dispatch({
    type: MonthTypes.ADD_POINTS,
    payload: { amount, number },
  });
};

export const removePoints = (amount, number) => (dispatch) => {
  dispatch({ type: MonthTypes.REMOVE_POINTS, payload: { amount, number } });
};

export const setCompleted = (value, number, id) => (dispatch) => {
  dispatch({
    type: MonthTypes.SET_COMPLETED,
    payload: { completed: value, number, id },
  });
};

export const resetData = () => (dispatch) => {
  localStorage.removeItem(currentMonth);
  const data = createData();
  localStorage.setItem(currentMonth, JSON.stringify(data));
  dispatch({ type: MonthTypes.SET_DATA, payload: data });
};
