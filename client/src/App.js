import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from './components/Calendar/Calendar';
import TaskForm from './components/TaskForm/TaskForm';
import { loadMonthData } from './redux/month/month.actions';
import { loadCategoryData } from './redux/categories/categories.actions';
import { loadUserSettings } from './redux/userSettings/userSettings.actions';
import MonthNavigation from './components/MonthNavigation/MonthNavigation';
import Categories from './components/Categories/Categories';
import UserSettings from './components/UserSettings/UserSettings';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const { isCreating } = useSelector((state) => state.formReducer);
  const monthName = useSelector(
    (state) => state.monthReducer.currentMonth.nameOfMonth
  );

  useEffect(() => {
    dispatch(loadMonthData());
    dispatch(loadCategoryData());
    dispatch(loadUserSettings());
    //eslint-disable-next-line
  }, []);

  return (
    <main className={`${isCreating ? 'stop-scrolling ' : ''} grid-container`}>
      <header className="mainMonth">
        <h1 className="month-name">{monthName}</h1>
      </header>
      <UserSettings className="settings"></UserSettings>
      <Categories className="categories"></Categories>
      <Calendar className="cards"></Calendar>
      <MonthNavigation className="monthNavigation"></MonthNavigation>
      {isCreating && <TaskForm></TaskForm>}
    </main>
  );
};

export default App;
