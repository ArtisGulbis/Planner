import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './calendar.styles.scss';
import Card from '../Card/Card';
import { setData } from '../../redux/month/month.actions';
import { v4 } from 'uuid';

const Calendar = () => {
  const dispatch = useDispatch();
  const monthName = useSelector((state) => state.month.name);
  const totalPoints = useSelector((state) => state.month.totalPoints);
  const days = useSelector((state) => state.month.days);

  useEffect(() => {
    dispatch(setData());
  });

  return (
    <div className='calendar-container'>
      <h1 className='month-name'>{monthName}</h1>
      <h2>{totalPoints}</h2>
      <div className='card-container' key={v4()}>
        {days.map((day, i) => {
          return (
            <Card
              key={i}
              monthDayNumber={day.dayNr}
              tasks={day.tasks}
              totalPoints={day.totalPoints}
            ></Card>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
