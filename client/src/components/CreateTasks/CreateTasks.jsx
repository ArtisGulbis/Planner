import React from 'react';
import './createTask.styles.scss';

const createTasks = () => {
  return (
    <form
      //   id={`task-form-${monthDayNumber}`}
      className='create-task-form'
      //   data-id={monthDayNumber}
      //   onSubmit={(e) => handleSubmit(e)}
    >
      <input
        placeholder='Points...'
        type='number'
        // value={points}
        // onChange={(e) => {
        //   setError('');
        //   setPoints(e.target.value);
        // }}
      ></input>
      <input
        placeholder='Task...'
        type='text'
        // value={taskInput}
        // onChange={(e) => {
        //   setError('');
        //   setTaskInput(e.target.value);
        // }}
      ></input>
      <input
        type='number'
        placeholder='Duration...'
        // value={duration}
        // onChange={(e) => {
        //   setError('');
        //   setDuration(e.target.value);
        // }}
      ></input>
      <select>
        <option value='min'>Minute(s)</option>
        <option value='h'>Hour(s)</option>
      </select>
      <button type='submit'>Create</button>
    </form>
  );
};

export default createTasks;
