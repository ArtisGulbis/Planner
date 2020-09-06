import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from './components/Calendar/Calendar';
import TaskForm from './components/TaskForm/TaskForm';
import { resetData } from './redux/month/month.actions';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const { isCreating } = useSelector((state) => state.form);

  return (
    <div className={`${isCreating ? 'stop-scrolling ' : ''}`}>
      <button onClick={(e) => dispatch(resetData())}>Reset</button>
      {isCreating && <TaskForm></TaskForm>}
      <Calendar></Calendar>
    </div>
  );
};

export default App;
