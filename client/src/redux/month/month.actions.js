import { MonthTypes } from './month.types';
import moment from 'moment';

const currentMonth = moment().format('MMMM');

const createData = () => {
  const monthData = [];

  for (let i = moment().get('month'); i < 12; i++) {
    const currentYear = moment().format('YYYY');
    const monthName = moment().month(i).format('MMMM');
    const month = moment().month(i).format('M');
    const dateToCheck = `${currentYear}-${month}`;
    const daysInMonth = moment(dateToCheck, 'YYYY-MM').daysInMonth();

    const dayArray = [];
    let j = parseInt(daysInMonth);
    while (j > 0) {
      const day = {
        dayNr: j,
        totalPoints: 0,
        tasks: [],
      };
      dayArray.push(day);
      j--;
    }
    const monthObj = {
      monthName,
      amountOfDays: daysInMonth,
      days: dayArray.reverse(),
      totalPoints: 0,
    };

    localStorage.setItem(monthObj.monthName, JSON.stringify(monthObj));

    monthData.push(monthObj);
  }
  return monthData;
};

export const setData = () => (dispatch) => {
  const storage = JSON.parse(localStorage.getItem(currentMonth));
  let data = [];
  if (!storage) {
    //create data for the rest of the year
    data = createData();

    dispatch({ type: MonthTypes.SET_DATA, payload: { data, currentMonth } });
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      data.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    dispatch({ type: MonthTypes.SET_DATA, payload: { data, currentMonth } });
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
