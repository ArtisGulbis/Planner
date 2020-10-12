import React from 'react';
import './sidebar.styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { switchMonth } from '../../redux/month/month.actions';

const Sidebar = () => {
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
    <div>
      {monthData.map((month, i) => (
        <h1 key={i} onClick={(e) => handleClick(e)}>
          {month.nameOfMonth}
        </h1>
      ))}
    </div>
  );
};

export default Sidebar;
