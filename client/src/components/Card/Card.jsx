import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './card.styles.scss';
import Task from '../Task/Task';
import moment from 'moment';
import { showFormForTask } from '../../redux/form/form.actions';

const Card = ({ monthDayNumber, tasks }) => {
  const currentDay = moment().format('DD');
  const currMonth = moment().format('MMMM');
  const dispatch = useDispatch();
  const { monthName } = useSelector((state) => state.monthReducer.currentMonth);

  const checkIfPassedDay = () => {
    return (
      parseInt(monthDayNumber) < parseInt(currentDay) && monthName === currMonth
    );
  };

  return (
    <div
      className={`card ${
        parseInt(currentDay) === parseInt(monthDayNumber) &&
        currMonth === monthName
          ? 'current-day'
          : ''
      } ${checkIfPassedDay() ? 'passed-day' : ''}`}
    >
      <h3>{monthDayNumber}</h3>
      {tasks.map((task) => (
        <Task key={task.id} task={task} monthDayNumber={monthDayNumber}></Task>
      ))}
      {checkIfPassedDay() ? (
        ''
      ) : (
        <button onClick={(e) => dispatch(showFormForTask(monthDayNumber))}>
          Add
        </button>
      )}
    </div>
  );
};

export default Card;
