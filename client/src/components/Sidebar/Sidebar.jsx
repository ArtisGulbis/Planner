import React from 'react';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const monthData = useSelector((state) => state.month.monthData);

  return (
    <div>
      {monthData.map((month, i) => (
        <p key={i}>{month.monthName}</p>
      ))}
    </div>
  );
};

export default Sidebar;
