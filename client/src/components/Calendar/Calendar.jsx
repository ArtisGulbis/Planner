import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './calendar.styles.scss';
import Card from '../Card/Card';
import { setData } from '../../redux/month/month.actions';
import {
  loadUserSettings,
  changeShowCards,
} from '../../redux/userSettings/userSettings.actions';
import { v4 } from 'uuid';
import moment from 'moment';

const Calendar = () => {
  const currentDay = moment().format('DD');
  const dispatch = useDispatch();
  // const [hideCards, setHideCards] = useState(false);
  const monthName = useSelector((state) => state.month.currentMonth.monthName);
  const { hideCards } = useSelector((state) => state.user);
  const totalPoints = useSelector(
    (state) => state.month.currentMonth.totalPoints
  );
  const days = useSelector((state) => state.month.currentMonth.days);
  useEffect(() => {
    dispatch(setData());
    dispatch(loadUserSettings());
    // eslint-disable-next-line
  }, []);

  return (
    <div className='calendar-container'>
      <h1 className='month-name'>{monthName}</h1>
      <h2>{totalPoints}</h2>
      <label className='switch'>
        <input
          type='checkbox'
          checked={hideCards || false}
          onChange={(e) => dispatch(changeShowCards(!hideCards))}
        ></input>
        <span className='slider round'></span>
      </label>
      <div className='card-container' key={v4()}>
        {days.map((day, i) => {
          return !hideCards ? (
            <Card
              key={i}
              monthDayNumber={day.dayNr}
              tasks={day.tasks}
              totalPoints={day.totalPoints}
            ></Card>
          ) : hideCards && parseInt(day.dayNr) < parseInt(currentDay) ? (
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
