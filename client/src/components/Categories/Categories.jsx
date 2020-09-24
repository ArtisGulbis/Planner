import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNewCategory,
  removeCategory,
} from '../../redux/categories/categories.actions';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.cat);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewCategory(newCategoryName));
    setNewCategoryName('');
  };

  const handleClick = (category) => {
    if ((category.time.hour || category.time.minute) > 0) {
      return setError('Clear time first');
    }

    dispatch(removeCategory(category.name));
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          placeholder='Category name...'
          value={newCategoryName}
          onChange={(e) => {
            setNewCategoryName(e.target.value);
            setError('');
          }}
        ></input>
        <button type='submit'>Create new category</button>
      </form>
      {categories.map((category, i) => {
        return (
          <div key={i}>
            <h2>{category.name}</h2>
            <h3>{`${category.time.hour} h ${category.time.minute} min`}</h3>
            <button onClick={(e) => handleClick(category)}>X</button>
          </div>
        );
      })}
      <p>{error}</p>
    </div>
  );
};

export default Categories;
