import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from './components/Calendar/Calendar';
import TaskForm from './components/TaskForm/TaskForm';
import { resetData } from './redux/month/month.actions';
import { loadCategoryData } from './redux/categories/categories.actions';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import Categories from './components/Categories/Categories';

const App = () => {
  const dispatch = useDispatch();
  const { isCreating } = useSelector((state) => state.form);
  const monthName = useSelector((state) => state.month.currentMonth.monthName);

  useEffect(() => {
    dispatch(loadCategoryData());
    //eslint-disable-next-line
  }, []);
  return (
    <div className={`${isCreating ? 'stop-scrolling ' : ''}`}>
      <Sidebar></Sidebar>
      <Categories></Categories>
      <button onClick={(e) => dispatch(resetData(monthName))}>Reset</button>
      {isCreating && <TaskForm></TaskForm>}
      <Calendar></Calendar>
    </div>
  );
};

export default App;
