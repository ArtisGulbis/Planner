import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/month/month.actions';
import { v4 } from 'uuid';
import { showFormForTask } from '../../redux/form/form.actions';
import './taskform.styles.scss';

const TaskForm = () => {
  const dispatch = useDispatch();
  const { currentCard } = useSelector((state) => state.form);
  const [taskInput, setTaskInput] = useState('');
  const [points, setPoints] = useState('');
  const [error, setError] = useState('');
  const [duration, setDuration] = useState('');
  const [timeType, setTimeType] = useState('min');
  const [category, setCategory] = useState('Gaming');
  const [successMessage, setSuccessMessage] = useState('');
  const categories = useSelector((state) => state.categories.cat);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (points === '' && taskInput === '') {
      setError('Fields are missing!');
      return;
    } else if (taskInput === '') {
      setError('Task is missing');
      return;
    } else if (points === '') {
      setError('Points are missing');
      return;
    } else if (duration === '') {
      return setError('Duration is missing');
    }

    const task = {
      name: taskInput,
      completed: false,
      duration,
      timeType,
      category,
      points: points < 0 ? points * -1 : points,
      id: v4(),
    };

    //Clear Inputs
    setTaskInput('');
    setPoints('');
    setDuration('');
    setSuccessMessage('Task added');

    dispatch(addTask(task, parseInt(e.target.dataset.id)));
  };

  const clearErrorAndSuccess = () => {
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className='form-container'>
      <form
        id={`task-form-${currentCard}`}
        className='create-task-form'
        data-id={currentCard}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h3>Create new tasks...</h3>
        <input
          className='create-task-form__item task'
          placeholder='Task...'
          type='text'
          autoFocus={true}
          value={taskInput}
          onChange={(e) => {
            clearErrorAndSuccess();
            setTaskInput(e.target.value);
          }}
        ></input>
        <input
          placeholder='Points...'
          type='number'
          value={points}
          className='create-task-form__item'
          onChange={(e) => {
            clearErrorAndSuccess();
            setPoints(e.target.value);
          }}
        ></input>
        <input
          className='create-task-form__item'
          type='number'
          placeholder='Duration...'
          value={duration}
          onChange={(e) => {
            clearErrorAndSuccess();
            setDuration(e.target.value);
          }}
        ></input>
        <select onChange={(e) => setTimeType(e.target.value)}>
          <option value='min'>Minute(s)</option>
          <option value='h'>Hour(s)</option>
        </select>
        <select onChange={(e) => setCategory(e.target.value)}>
          {categories.map((el, i) => (
            <option key={i} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>
        {error ? <p>{error}</p> : <p></p>}
        {successMessage ? <p>{successMessage}</p> : <p></p>}
        <div className='create-task-form__buttons'>
          <button type='submit'>Add</button>
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

// <option value='Gaming'>Gaming</option>
//           <option value='Fitness'>Fitness</option>
//           <option value='Studying'>Studiying</option>
//           <option value='Guitar'>Guitar</option>
