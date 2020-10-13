import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeShowCards } from '../../redux/userSettings/userSettings.actions';
import './hideCards.styles.scss';
const HideCards = () => {
  const dispatch = useDispatch();
  const { hideCards } = useSelector((state) => state.userSettingsReducer);
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={hideCards || false}
        onChange={(e) => dispatch(changeShowCards(!hideCards))}
      ></input>
      <span className="slider round"></span>
    </label>
  );
};

export default HideCards;
