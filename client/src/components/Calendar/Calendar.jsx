import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './calendar.styles.scss';
import Card from '../Card/Card';
import { changeShowCards } from '../../redux/userSettings/userSettings.actions';
import { v4 } from 'uuid';
import moment from 'moment';

const Calendar = () => {
  const currentDay = moment().format('DD');
  const currMonth = moment().format('MMMM');
  const dispatch = useDispatch();
  const monthName = useSelector(
    (state) => state.monthReducer.currentMonth.nameOfMonth
  );
  const { hideCards } = useSelector((state) => state.userSettingsReducer);
  const days = useSelector((state) => state.monthReducer.currentMonth.days);
  return (
    <div className="calendar-container">
      <h1 className="month-name">{monthName}</h1>
      <label className="switch">
        <input
          type="checkbox"
          checked={hideCards || false}
          onChange={(e) => dispatch(changeShowCards(!hideCards))}
        ></input>
        <span className="slider round"></span>
      </label>
      <div className="card-container" key={v4()}>
        {days.map((day, i) => {
          return !hideCards ? (
            <Card
              key={i}
              monthDayNumber={day.dayNr}
              tasks={day.tasks}
              totalPoints={day.totalPoints}
            ></Card>
          ) : hideCards &&
            parseInt(day.dayNr) < parseInt(currentDay) &&
            monthName === currMonth ? (
            ''
          ) : (
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
