import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './card.styles.scss';
import Task from '../Task/Task';
import moment from 'moment';
import TaskForm from '../TaskForm/TaskForm';
import { showFormForTask } from '../../redux/form/form.actions';

const Card = ({ monthDayNumber, tasks, totalPoints }) => {
  const currentDay = moment().format('DD');
  const dispatch = useDispatch();
  const { isCreating, currentCard } = useSelector((state) => state.form);

  return (
    <div
      className={`card ${
        parseInt(currentDay) === parseInt(monthDayNumber) ? 'current-day' : ''
      } ${parseInt(monthDayNumber) < parseInt(currentDay) ? 'passed-day' : ''}`}
    >
      <h3>{monthDayNumber}</h3>
      <p>Points: {totalPoints}</p>
      {tasks.map((task) => (
        <Task key={task.id} task={task} monthDayNumber={monthDayNumber}></Task>
      ))}
      {isCreating && currentCard === monthDayNumber && (
        <TaskForm monthDayNumber={monthDayNumber}></TaskForm>
      )}
      <button onClick={(e) => dispatch(showFormForTask(monthDayNumber))}>
        create
      </button>
    </div>
  );
};

export default Card;
