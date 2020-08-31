import React from 'react';
import './card.styles.scss';
import Task from '../Task/Task';
import moment from 'moment';
import TaskForm from '../TaskForm/TaskForm';

const Card = ({ monthDayNumber, tasks, totalPoints }) => {
  const currentDay = moment().format('DD');

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
      <TaskForm monthDayNumber={monthDayNumber}></TaskForm>
      <button>Add tasks</button>
    </div>
  );
};

export default Card;
