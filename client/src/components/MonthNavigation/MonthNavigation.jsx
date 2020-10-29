import React from 'react';
import './sidebar.styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { switchMonth } from '../../redux/month/month.actions';
import MonthNavigationItem from '../MonthNavigationItem/MonthNavigationItem';

const MonthNavigation = ({ className }) => {
  const dispatch = useDispatch();
  const monthData = useSelector((state) => state.monthReducer.monthData);
  const { nameOfMonth } = useSelector(
    (state) => state.monthReducer.currentMonth
  );
  const handleClick = (e) => {
    //to prevent unnecessary loads
    if (nameOfMonth === e.target.textContent) {
      return;
    }
    dispatch(switchMonth(e.target.textContent));
  };

  return (
    <nav className={className}>
      <ul>
        {monthData.map((month, i) => (
          <MonthNavigationItem
            key={i}
            month={month}
            handleClick={handleClick}
          ></MonthNavigationItem>
        ))}
      </ul>
    </nav>
  );
};

export default MonthNavigation;
