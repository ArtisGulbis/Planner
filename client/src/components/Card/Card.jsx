import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './card.styles.scss';
import Task from '../Task/Task';
import moment from 'moment';
import { showFormForTask } from '../../redux/form/form.actions';
import CustomButton from '../CustomButton/CustomButton';

const Card = ({ monthDayNumber, tasks }) => {
  const currentDay = moment().format('DD');
  const currMonth = moment().format('MMMM');
  const dispatch = useDispatch();
  const { nameOfMonth } = useSelector(
    (state) => state.monthReducer.currentMonth
  );

  const checkIfPassedDay = () => {
    return (
      parseInt(monthDayNumber) < parseInt(currentDay) &&
      nameOfMonth === currMonth
    );
  };
  const handleClick = () => {
    dispatch(showFormForTask(monthDayNumber));
  };

  return (
    <li
      className={`card ${
        parseInt(currentDay) === parseInt(monthDayNumber) &&
        currMonth === nameOfMonth
          ? 'current-day'
          : ''
      } ${checkIfPassedDay() ? 'passed-day' : ''}`}
    >
      <h3>{monthDayNumber}</h3>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            monthDayNumber={monthDayNumber}
          ></Task>
        ))}
      </ul>
      {checkIfPassedDay() ? (
        ''
      ) : (
        <CustomButton onClick={handleClick}>Add</CustomButton>
      )}
    </li>
  );
};

export default Card;
