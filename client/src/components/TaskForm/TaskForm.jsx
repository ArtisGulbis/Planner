import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/month/month.actions';
import { v4 } from 'uuid';
import { showFormForTask } from '../../redux/form/form.actions';
import './taskform.styles.scss';

const TaskForm = () => {
  const dispatch = useDispatch();
  const { currentCard } = useSelector((state) => state.form);
  const categories = useSelector((state) => state.categories.cat);
  const { monthName } = useSelector((state) => state.month.currentMonth);
  const [taskInput, setTaskInput] = useState('');
  const [error, setError] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [category, setCategory] = useState('Guitar');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput === '') {
      setError('Fields are missing!');
      return;
    } else if (taskInput === '') {
      setError('Task is missing');
      return;
    }

    const task = {
      name: taskInput,
      completed: false,
      duration: {
        minutes: parseInt(minutes) < 0 ? parseInt(minutes) * -1 : minutes,
        hours: parseInt(hours) < 0 ? parseInt(hours) * -1 : hours,
      },
      category,
      id: v4(),
    };
    setTaskInput('');
    setHours('');
    setMinutes('');
    setSuccessMessage('Task added');

    dispatch(addTask(task, parseInt(e.target.dataset.id)));
  };

  const clearErrorAndSuccess = () => {
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="form-container">
      <form
        id={`task-form-${currentCard}`}
        className="create-task-form"
        data-id={currentCard}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h3>Create new tasks...</h3>
        <input
          className="create-task-form__item task"
          placeholder="Task..."
          type="text"
          autoFocus={true}
          value={taskInput}
          onChange={(e) => {
            clearErrorAndSuccess();
            setTaskInput(e.target.value);
          }}
        ></input>
        <label htmlFor="hours">Hours:</label>
        <input
          name="hours"
          className="create-task-form__item"
          type="number"
          value={hours}
          onFocus={(e) => !hours && setHours('')}
          onBlur={(e) => !hours && setHours(0)}
          onChange={(e) => {
            clearErrorAndSuccess();
            setHours(e.target.value);
          }}
        ></input>
        <label htmlFor="minutes">Minutes:</label>
        <input
          name="minutes"
          className="create-task-form__item"
          type="number"
          onFocus={(e) => !minutes && setMinutes('')}
          onBlur={(e) => !minutes && setMinutes(0)}
          value={minutes}
          onChange={(e) => {
            clearErrorAndSuccess();
            setMinutes(e.target.value);
          }}
        ></input>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((el) =>
            el.month === monthName
              ? el.categories.map((el, i) => (
                  <option key={i} value={el.name}>
                    {el.name}
                  </option>
                ))
              : ''
          )}
        </select>
        {error ? <p>{error}</p> : <p></p>}
        {successMessage ? <p>{successMessage}</p> : <p></p>}
        <div className="create-task-form__buttons">
          <button type="submit">Add</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(showFormForTask(currentCard));
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
