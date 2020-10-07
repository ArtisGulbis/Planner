import React from 'react';
import './sidebar.styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { switchMonth } from '../../redux/month/month.actions';
import { switchCategories } from '../../redux/categories/categories.actions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const monthData = useSelector((state) => state.month.monthData);
  const { monthName } = useSelector((state) => state.month.currentMonth);
  const handleClick = (e) => {
    //to prevent unnecessary loads
    if (monthName === e.target.textContent) {
      return;
    }
    e.preventDefault();
    dispatch(switchMonth(e.target.textContent));
    dispatch(switchCategories(e.target.textContent));
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
