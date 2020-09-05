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
      points: points < 0 ? points * -1 : points,
      id: v4(),
    };

    //Clear Inputs
    setTaskInput('');
    setPoints('');
    setDuration('');

    dispatch(addTask(task, parseInt(e.target.dataset.id)));
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
          value={taskInput}
          onChange={(e) => {
            setError('');
            setTaskInput(e.target.value);
          }}
        ></input>
        <input
          placeholder='Points...'
          autoFocus={true}
          type='number'
          value={points}
          className='create-task-form__item'
          onChange={(e) => {
            setError('');
            setPoints(e.target.value);
          }}
        ></input>
        <input
          className='create-task-form__item'
          type='number'
          placeholder='Duration...'
          value={duration}
          onChange={(e) => {
            setError('');
            setDuration(e.target.value);
          }}
        ></input>
        <select onChange={(e) => setTimeType(e.target.value)}>
          <option value='min'>Minute(s)</option>
          <option value='h'>Hour(s)</option>
        </select>
        {error && <p>{error}</p>}
        <div className='create-task-form__buttons'>
          <button type='submit'>Create</button>
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
