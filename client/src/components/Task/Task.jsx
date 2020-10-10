import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTask,
  setCompleted,
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
      dispatch(
        addTimeToCategory({
          monthName,
          category: task.category,
          hours: parseInt(task.duration.hours),
          minutes: parseInt(task.duration.minutes),
        })
      );
    } else if (!task.completed) {
      dispatch(
        removeTimeFromCategory({
          monthName,
          category: task.category,
          hours: parseInt(task.duration.hours),
          minutes: parseInt(task.duration.minutes),
        })
      );
    }
  };

  const handleOnClick = () => {
    dispatch(deleteTask(task.id, monthDayNumber));
    dispatch(
      removeTimeFromCategory({
        monthName,
        category: task.category,
        hours: parseInt(task.duration.hours),
        minutes: parseInt(task.duration.minutes),
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
      <p>{`${task.duration.hours} h ${task.duration.minutes} min`}</p>
      <button onClick={handleOnClick}>X</button>
    </div>
  );
};

export default Task;
