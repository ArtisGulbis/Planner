import React, { Fragment } from 'react';
import Calendar from './components/Calendar/Calendar';
import './App.scss';
import CreateTask from './components/CreateTasks/CreateTasks';

const App = () => {
  return (
    <Fragment>
      <Calendar></Calendar>
      <CreateTask></CreateTask>
    </Fragment>
  );
};

export default App;
