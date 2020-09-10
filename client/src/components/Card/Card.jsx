import React from 'react';
import { useDispatch } from 'react-redux';
import './card.styles.scss';
import Task from '../Task/Task';
import moment from 'moment';
import { showFormForTask } from '../../redux/form/form.actions';

const Card = ({ monthDayNumber, tasks, totalPoints }) => {
  const currentDay = moment().format('DD');
  const dispatch = useDispatch();

  const checkIfPassedDay = () => {
    return parseInt(monthDayNumber) < parseInt(currentDay);
  };

  return (
    <div
      className={`card ${
        parseInt(currentDay) === parseInt(monthDayNumber) ? 'current-day' : ''
      } ${checkIfPassedDay() ? 'passed-day' : ''}`}
    >
      <h3>{monthDayNumber}</h3>
      <p>Points: {totalPoints}</p>
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
