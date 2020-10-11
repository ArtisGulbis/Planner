import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, setCompleted } from '../../redux/month/month.actions';
import {
  addTimeToCategory,
  removeTimeFromCategory,
} from '../../redux/categories/categories.actions';

import './task.styles.scss';

const Task = ({ task, monthDayNumber }) => {
  const dispatch = useDispatch();
  const { monthName } = useSelector((state) => state.monthReducer.currentMonth);
  const categories = useSelector(
    (state) => state.categoriesReducer.monthCategories
  );

  const handleChange = (e) => {
    dispatch(setCompleted(!task.completed, monthDayNumber, task.id));
    if (task.category === 'None') {
      return;
    }
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

  const checkForCategory = (category) => {
    const [cats] = categories.map((el) => {
      return el.month === monthName && el.categories;
    });
    const currentCategories = cats.map((el) => el.name);
    return currentCategories.includes(category);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id, monthDayNumber));

    if (checkForCategory(task.category) && task.completed) {
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

  const shortenText = (text) => {
    let newText;
    const maxWordLength = 2;
    const maxCharacterLength = 15;
    const addSpaceAndLetters = 3;
    const splitText = text.split(' ');
    if (splitText.length >= maxWordLength) {
      const firstTwoWords = `${splitText[0]} ${splitText[1]}`;

      if (firstTwoWords.length > maxCharacterLength) {
        newText = firstTwoWords.slice(
          0,
          splitText[0].length + addSpaceAndLetters
        );
        return `${newText}...`;
      }
      return `${firstTwoWords}...`;
    } else if (splitText[0].length > maxCharacterLength) {
      return `${splitText[0].slice(0, 15)}...`;
    }
    return text;
  };

  return (
    <div className="task-container" data-id={task.id}>
      <input
        type="checkbox"
        checked={task.completed}
        disabled={checkForCategory(task.category) ? false : true}
        onChange={(e) => handleChange(e)}
      ></input>
      <p>{shortenText(task.name)}</p>
      {task.category === 'None' ? (
        <div style={{ display: 'inline' }}>
          <button onClick={handleDelete}>X</button>
        </div>
      ) : (
        <div style={{ display: 'inline' }}>
          <p>{task.category}</p>
          <p>{`${parseInt(task.duration.hours)} h ${parseInt(
            task.duration.minutes
          )} min`}</p>
          <button onClick={handleDelete}>X</button>
        </div>
      )}
    </div>
  );
};

export default Task;
