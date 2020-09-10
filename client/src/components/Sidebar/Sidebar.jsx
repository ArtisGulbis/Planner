import React from 'react';
import moment from 'moment';

const Sidebar = () => {
  for (let i = moment().get('month'); i < 12; i++) {
    const currentYear = moment().format('YYYY');
    const currentMonth = moment().month(i).format('MMMM');
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
    const monthData = {
      name: currentMonth,
      amountOfDays: daysInMonth,
      days: dayArray.reverse(),
      totalPoints: 0,
    };
    console.log(monthData);
  }
  return <div></div>;
};

export default Sidebar;
