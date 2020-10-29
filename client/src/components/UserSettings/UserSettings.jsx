import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HideCards from '../HideCards/HideCards';
import { resetData } from '../../redux/month/month.actions';
import { resetCategoryData } from '../../redux/categories/categories.actions';
import CustomButton from '../CustomButton/CustomButton';
import './userSettings.styles.scss';

const UserSettings = ({ className }) => {
  const nameOfMonth = useSelector(
    (state) => state.monthReducer.currentMonth.nameOfMonth
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetData(nameOfMonth));
    dispatch(resetCategoryData(nameOfMonth));
  };

  return (
    <section className={`${className} user-settings`}>
      <HideCards></HideCards>
      <CustomButton classes="reset-button" onClick={(e) => handleClick()}>
        Reset
      </CustomButton>
    </section>
  );
};

export default UserSettings;
