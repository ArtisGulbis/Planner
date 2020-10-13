import React from 'react';

const MonthNavigationItem = ({ month, handleClick }) => {
  return (
    <li>
      <p onClick={(e) => handleClick(e)}>{month.nameOfMonth}</p>
    </li>
  );
};

export default MonthNavigationItem;
