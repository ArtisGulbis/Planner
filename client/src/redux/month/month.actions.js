import { MonthTypes } from './month.types';
import { currentYear } from '../utils';
import moment from 'moment';

const currentMonth = moment().format('MMMM');

const createData = (name) => {
  let dayArray = [];
  const monthData = {
    monthData: [],
  };
  if (name) {
    const daysInMonth = moment().month(name).daysInMonth();
    let i = parseInt(daysInMonth);

    while (i > 0) {
      const day = {
        dayNr: i,
        tasks: [],
      };
      dayArray.push(day);
      i--;
    }
    const monthObj = {
      monthName: name,
      amountOfDays: daysInMonth,
      days: dayArray.reverse(),
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
        tasks: [],
      };
      dayArray.push(day);
      j--;
    }
    const monthObj = {
      monthName,
      amountOfDays: daysInMonth,
      days: dayArray.reverse(),
    };

    monthData.monthData.push(monthObj);
  }
  console.log(monthData);

  localStorage.setItem(currentYear, JSON.stringify(monthData));
  return monthData;
};

export const setMonthData = () => (dispatch) => {
  const storage = JSON.parse(localStorage.getItem(currentYear));
  let data = [];
  let currentMonthObj;
  if (!storage) {
    //create data for the rest of the year
    data = createData();
    currentMonthObj = data.monthData.filter(
      (month) => month.monthName === currentMonth
    );
    dispatch({
      type: MonthTypes.SET_DATA,
      payload: {
        data: data.monthData,
        currentMonth: { ...currentMonthObj[0] },
      },
    });
  } else {
    // for (let i = moment().get('month'); i < 12; i++) {
    //   data.push(
    //     JSON.parse(localStorage.getItem(moment().month(i).format('MMMM')))
    //   );
    // }
    currentMonthObj = storage.monthData.filter(
      (month) => month.monthName === currentMonth
    );
    dispatch({
      type: MonthTypes.SET_DATA,
      payload: {
        data: storage.monthData,
        currentMonth: { ...currentMonthObj[0] },
      },
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
