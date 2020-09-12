import React from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteTask,
  addPoints,
  setCompleted,
  removePoints,
} from '../../redux/month/month.actions';
import './task.styles.scss';

const Task = ({ task, monthDayNumber }) => {
  const dispatch = useDispatch();

  const handleChande = (e) => {
    dispatch(setCompleted(!task.completed, monthDayNumber, task.id));
    task.completed && dispatch(addPoints(task.points, monthDayNumber));
    !task.completed && dispatch(removePoints(task.points, monthDayNumber));
  };
  return (
    <div className='task-container' data-id={task.id}>
      <input
        type='checkbox'
        checked={task.completed}
        onChange={(e) => handleChande(e)}
      ></input>
      <p>{task.name}</p>
      <p>{task.points}</p>
      <p>{`${task.duration} ${task.timeType}`}</p>
      <button onClick={() => dispatch(deleteTask(task.id, monthDayNumber))}>
        X
      </button>
    </div>
  );
};

export default Task;
