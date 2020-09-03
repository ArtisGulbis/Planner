import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/month/month.actions';
import { v4 } from 'uuid';
import { showFormForTask } from '../../redux/form/form.actions';
import './taskform.styles.scss';

const TaskForm = ({ monthDayNumber }) => {
  const dispatch = useDispatch();
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

    dispatch(addTask(task, parseInt(e.target.dataset.id)));
  };

  return (
    <form
      id={`task-form-${monthDayNumber}`}
      className="create-task-form"
      data-id={monthDayNumber}
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        placeholder="Points..."
        type="number"
        value={points}
        onChange={(e) => {
          setError('');
          setPoints(e.target.value);
        }}
      ></input>
      <input
        placeholder="Task..."
        type="text"
        value={taskInput}
        onChange={(e) => {
          setError('');
          setTaskInput(e.target.value);
        }}
      ></input>
      <input
        type="number"
        placeholder="Duration..."
        value={duration}
        onChange={(e) => {
          setError('');
          setDuration(e.target.value);
        }}
      ></input>
      <select onChange={(e) => setTimeType(e.target.value)}>
        <option value="min">Minute(s)</option>
        <option value="h">Hour(s)</option>
      </select>
      {error && <p>{error}</p>}
      <button type="submit">Create</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(showFormForTask(monthDayNumber));
        }}
      >
        cancel
      </button>
    </form>
  );
};

export default TaskForm;
