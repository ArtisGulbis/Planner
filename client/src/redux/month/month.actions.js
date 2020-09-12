import { MonthTypes } from './month.types';
import moment from 'moment';

const currentMonth = moment().format('MMMM');

const createData = (name) => {
  let dayArray = [];
  const monthData = [];
  const currentYear = moment().format('YYYY');
  if (name) {
    const daysInMonth = moment().month(name).daysInMonth();
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
    const monthObj = {
      monthName: name,
      amountOfDays: daysInMonth,
      days: dayArray.reverse(),
      totalPoints: 0,
    };
    return monthObj;
  }
  for (let i = moment().get('month'); i < 12; i++) {
    dayArray = [];
    const monthName = moment().month(i).format('MMMM');
    const month = moment().month(i).format('M');
    const dateToCheck = `${currentYear}-${month}`;
    const daysInMonth = moment(dateToCheck, 'YYYY-MM').daysInMonth();
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
  let currentMonthObj;
  if (!storage) {
    //create data for the rest of the year
    data = createData();

    currentMonthObj = data.filter((month) => month.monthName === currentMonth);
    dispatch({
      type: MonthTypes.SET_DATA,
      payload: { data, currentMonth: { ...currentMonthObj[0] } },
    });
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      data.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    currentMonthObj = data.filter((month) => month.monthName === currentMonth);
    dispatch({
      type: MonthTypes.SET_DATA,
      payload: { data, currentMonth: { ...currentMonthObj[0] } },
    });
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

export const resetData = (monthName) => (dispatch) => {
  localStorage.removeItem(monthName);
  const data = createData(monthName);
  dispatch({ type: MonthTypes.RESET_MONTH, payload: data });
};

export const switchMonth = (name) => (dispatch) => {
  dispatch({ type: MonthTypes.SWITCH_MONTH, payload: name });
};
