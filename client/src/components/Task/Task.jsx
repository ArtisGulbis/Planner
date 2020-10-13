import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, setCompleted } from '../../redux/month/month.actions';
import {
  addTimeToCategory,
  removeTimeFromCategory,
} from '../../redux/categories/categories.actions';
import CustomButton from '../CustomButton/CustomButton';
import TaskNoCategory from '../TaskNoCategory/TaskNoCategory';

import './task.styles.scss';

const Task = ({ task, monthDayNumber }) => {
  const dispatch = useDispatch();
  const { nameOfMonth } = useSelector(
    (state) => state.monthReducer.currentMonth
  );
  const categories = useSelector((state) => state.categoriesReducer.data);

  const handleChange = (e) => {
    dispatch(setCompleted(!task.completed, monthDayNumber, task.id));
    if (task.category === 'None') {
      return;
    }
    if (task.completed) {
      dispatch(
        addTimeToCategory({
          nameOfMonth,
          category: task.category,
          hours: parseInt(task.duration.hours),
          minutes: parseInt(task.duration.minutes),
        })
      );
    } else if (!task.completed) {
      dispatch(
        removeTimeFromCategory({
          nameOfMonth,
          category: task.category,
          hours: parseInt(task.duration.hours),
          minutes: parseInt(task.duration.minutes),
        })
      );
    }
  };

  const checkForCategory = (category) => {
    const [{ monthCategories }] = categories.filter(
      (month) => month.nameOfMonth === nameOfMonth && month.monthCategories
    );
    const currentCategories = monthCategories.map(
      (category) => category.categoryName
    );
    return currentCategories.includes(category);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id, monthDayNumber));

    if (checkForCategory(task.category) && task.completed) {
      dispatch(
        removeTimeFromCategory({
          nameOfMonth,
          category: task.category,
          hours: parseInt(task.duration.hours),
          minutes: parseInt(task.duration.minutes),
        })
      );
    }
  };

  const createRenderData = () => {
    return (
      <li className="task-container" data-id={task.id}>
        <input
          type="checkbox"
          checked={task.completed}
          disabled={checkForCategory(task.category) ? false : true}
          onChange={(e) => handleChange(e)}
        ></input>
        <p>{task.name}</p>
        <p>{task.category}</p>
        <p>{task.duration.hours !== 0 ? `${task.duration.hours} h` : ''}</p>
        <p>
          {task.duration.minutes !== 0 ? `${task.duration.minutes} min` : ''}
        </p>
        <CustomButton onClick={handleDelete}>X</CustomButton>
      </li>
    );
  };

  return task.category === 'None' ? (
    <TaskNoCategory
      task={task}
      handleDelete={handleDelete}
      checkForCategory={checkForCategory}
      handleChange={handleChange}
    ></TaskNoCategory>
  ) : (
    createRenderData()
  );
};
//<li className="task-container" data-id={task.id}>

export default Task;
