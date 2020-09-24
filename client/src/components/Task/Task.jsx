import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTask,
  addPoints,
  setCompleted,
  removePoints,
} from '../../redux/month/month.actions';
import {
  addTimeToCategory,
  removeTimeFromCategory,
} from '../../redux/categories/categories.actions';
import './task.styles.scss';

const Task = ({ task, monthDayNumber }) => {
  const dispatch = useDispatch();
  const { monthName } = useSelector((state) => state.month.currentMonth);
  const handleChange = (e) => {
    dispatch(setCompleted(!task.completed, monthDayNumber, task.id));
    if (task.completed) {
      dispatch(addPoints(task.points, monthDayNumber));
      dispatch(
        addTimeToCategory({
          monthName,
          category: task.category,
          hour: task.timeType === 'h' ? parseInt(task.duration) : 0,
          minute: task.timeType === 'min' ? parseInt(task.duration) : 0,
        })
      );
    } else if (!task.completed) {
      dispatch(removePoints(task.points, monthDayNumber));
      dispatch(
        removeTimeFromCategory({
          category: task.category,
          hour: task.timeType === 'h' ? parseInt(task.duration) : 0,
          minute: task.timeType === 'min' ? parseInt(task.duration) : 0,
        })
      );
    }
  };

  const handleOnClick = () => {
    dispatch(deleteTask(task.id, monthDayNumber));
    dispatch(
      removeTimeFromCategory({
        category: task.category,
        hour: task.timeType === 'h' ? parseInt(task.duration) : 0,
        minute: task.timeType === 'min' ? parseInt(task.duration) : 0,
      })
    );
  };

  return (
    <div className='task-container' data-id={task.id}>
      <input
        type='checkbox'
        checked={task.completed}
        onChange={(e) => handleChange(e)}
      ></input>
      <p>{task.name}</p>
      <p>{task.points}</p>
      <p>{`${task.duration} ${task.timeType}`}</p>
      <button onClick={handleOnClick}>X</button>
    </div>
  );
};

export default Task;
