import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from './components/Calendar/Calendar';
import TaskForm from './components/TaskForm/TaskForm';
import { resetData, setMonthData } from './redux/month/month.actions';
import {
  loadCategoryData,
  resetCategoryData,
} from './redux/categories/categories.actions';
import { loadUserSettings } from './redux/userSettings/userSettings.actions';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import Categories from './components/Categories/Categories';

const App = () => {
  const dispatch = useDispatch();
  const { isCreating } = useSelector((state) => state.formReducer);
  const nameOfMonth = useSelector(
    (state) => state.monthReducer.currentMonth.nameOfMonth
  );

  useEffect(() => {
    dispatch(setMonthData());
    dispatch(loadCategoryData());
    dispatch(loadUserSettings());
    //eslint-disable-next-line
  }, []);

  const handleClick = () => {
    dispatch(resetData(nameOfMonth));
    dispatch(resetCategoryData(nameOfMonth));
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
