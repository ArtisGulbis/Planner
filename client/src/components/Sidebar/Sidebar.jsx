import React from 'react';
import './sidebar.styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { switchMonth } from '../../redux/month/month.actions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const monthData = useSelector((state) => state.month.monthData);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(switchMonth(e.target.textContent));
  };

  return (
    <div>
      {monthData.map((month, i) => (
        <h1 key={i} onClick={(e) => handleClick(e)}>
          {month.monthName}
        </h1>
      ))}
    </div>
  );
};

export default Sidebar;
