import React from 'react';
import { useSelector } from 'react-redux';
import Calendar from './components/Calendar/Calendar';
import TaskForm from './components/TaskForm/TaskForm';
import './App.scss';

const App = () => {
  const { isCreating } = useSelector((state) => state.form);

  return (
    <div className={`${isCreating ? 'stop-scrolling ' : ''}`}>
      {isCreating && <TaskForm></TaskForm>}
      <Calendar></Calendar>
    </div>
  );
};

export default App;
