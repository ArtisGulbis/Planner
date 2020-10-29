import React from 'react';
import { useSelector } from 'react-redux';
import './calendar.styles.scss';
import Card from '../Card/Card';
import { v4 } from 'uuid';
import moment from 'moment';

const Calendar = ({ className }) => {
  const currentDay = moment().format('DD');
  const currMonth = moment().format('MMMM');
  const monthName = useSelector(
    (state) => state.monthReducer.currentMonth.nameOfMonth
  );
  const { hideCards } = useSelector((state) => state.userSettingsReducer);
  const days = useSelector((state) => state.monthReducer.currentMonth.days);
  return (
    <section className={`${className} calendar-container`}>
      <ul className="card-container" key={v4()}>
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
      </ul>
    </section>
  );
};

export default Calendar;
