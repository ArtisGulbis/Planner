import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNewCategory,
  removeCategory,
} from '../../redux/categories/categories.actions';

const Categories = () => {
  const dispatch = useDispatch();
  const { monthName } = useSelector((state) => state.monthReducer.currentMonth);
  const categories = useSelector(
    (state) => state.categoriesReducer.monthCategories
  );
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewCategory({ newCategoryName, monthName }));
    setNewCategoryName('');
  };

  const handleClick = (month, category) => {
    if ((category.time.hour || category.time.minute) > 0) {
      return setError('Clear time first');
    }
    dispatch(removeCategory(month, category.name));
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Category name..."
          value={newCategoryName}
          onChange={(e) => {
            setNewCategoryName(e.target.value);
            setError('');
          }}
        ></input>
        <button type="submit">Create new category</button>
      </form>
      <p>{error}</p>
      {categories.map((c, i) =>
        c.month === monthName ? (
          <div key={i}>
            <div>
              {c.categories.map((el, i) => {
                if (el.name === 'None') {
                  return;
                }
                return (
                  <div key={i}>
                    <p>{el.name}</p>
                    <p>{`${el.time.hour} h ${el.time.minute} min`}</p>
                    <button onClick={(e) => handleClick(c, el)}>X</button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ''
        )
      )}
    </div>
  );
};

export default Categories;
