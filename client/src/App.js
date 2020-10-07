import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from './components/Calendar/Calendar';
import TaskForm from './components/TaskForm/TaskForm';
import { resetData } from './redux/month/month.actions';
import {
  loadCategoryData,
  resetCategoryData,
} from './redux/categories/categories.actions';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import Categories from './components/Categories/Categories';
import Button from 'react-bootstrap/Button';

const App = () => {
  const dispatch = useDispatch();
  const { isCreating } = useSelector((state) => state.form);
  const monthName = useSelector((state) => state.month.currentMonth.monthName);

  useEffect(() => {
    dispatch(loadCategoryData());
    //eslint-disable-next-line
  }, []);

  const handleClick = () => {
    dispatch(resetData(monthName));
    dispatch(resetCategoryData(monthName));
    dispatch(loadCategoryData());
  };
  return (
    <div className={`${isCreating ? 'stop-scrolling ' : ''}`}>
      <Sidebar></Sidebar>
      <Categories></Categories>
      <button onClick={(e) => handleClick()}>Reset</button>
      {isCreating && <TaskForm></TaskForm>}
      <Calendar></Calendar>
    </div>
  );
};

export default App;
