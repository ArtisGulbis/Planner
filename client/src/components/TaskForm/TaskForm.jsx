import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/month/month.actions';
import { v4 } from 'uuid';
import { showFormForTask } from '../../redux/form/form.actions';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import CustomButton from '../CustomButton/CustomButton';
import './taskform.styles.scss';

const TaskForm = () => {
  const dispatch = useDispatch();
  const { currentCard } = useSelector((state) => state.formReducer);
  const categories = useSelector((state) => state.categoriesReducer.data);
  const { nameOfMonth } = useSelector(
    (state) => state.monthReducer.currentMonth
  );
  const [taskInput, setTaskInput] = useState('');
  const [error, setError] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [category, setCategory] = useState();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    //set default category
    categories.forEach((el) => {
      if (el.nameOfMonth === nameOfMonth) {
        setCategory(el.monthCategories[0].categoryName);
      }
    });
    //eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput === '') {
      setError('Task is missing!');
      return;
    }
    if (minutes === 0 && hours === 0 && category !== 'None') {
      setError('Change category to "None" if no time is provided');
      return;
    }

    const task = {
      name: taskInput,
      completed: false,
      duration: {
        hours: parseInt(hours) < 0 ? parseInt(hours) * -1 : hours,
        minutes: parseInt(minutes) < 0 ? parseInt(minutes) * -1 : minutes,
      },
      category,
      id: v4(),
    };
    setTaskInput('');
    setHours(0);
    setMinutes(0);
    setSuccessMessage('Task added');
    setError('');

    dispatch(addTask(task, parseInt(e.target.dataset.id)));
  };

  const clearErrorAndSuccess = () => {
    setError('');
    setSuccessMessage('');
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(showFormForTask(currentCard));
  };

  return (
    <form
      className="form-container create-task-form"
      id={`task-form-${currentCard}`}
      data-id={currentCard}
      onSubmit={(e) => handleSubmit(e)}
    >
      <h3>Create new tasks...</h3>
      <input
        className="create-task-form__item task"
        placeholder="Task..."
        type="text"
        maxLength={20}
        autoFocus={true}
        value={taskInput}
        onChange={(e) => {
          clearErrorAndSuccess();
          setTaskInput(e.target.value);
        }}
      ></input>
      {category !== 'None' ? (
        <div>
          <label htmlFor="hours">Hours:</label>
          <input
            max={99}
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
            max={999}
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
        </div>
      ) : (
        ''
      )}
      <select
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        {categories.map((el) =>
          el.nameOfMonth === nameOfMonth
            ? el.monthCategories.map((el, i) => (
                <option key={i} value={el.categoryName}>
                  {el.categoryName}
                </option>
              ))
            : ''
        )}
      </select>
      {error ? <NotificationMessage message={error}></NotificationMessage> : ''}
      {successMessage ? (
        <NotificationMessage message={successMessage}></NotificationMessage>
      ) : (
        ''
      )}
      <div className="create-task-form__buttons">
        <CustomButton type="submit">Add</CustomButton>
        <CustomButton onClick={(e) => handleClick(e)}>Cancel</CustomButton>
      </div>
    </form>
  );
};

export default TaskForm;
