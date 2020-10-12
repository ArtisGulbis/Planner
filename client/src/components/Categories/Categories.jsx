import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNewCategory,
  removeCategory,
} from '../../redux/categories/categories.actions';

const Categories = () => {
  const dispatch = useDispatch();
  const { nameOfMonth } = useSelector(
    (state) => state.monthReducer.currentMonth
  );
  const categories = useSelector((state) => state.categoriesReducer.data);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewCategory({ newCategoryName, nameOfMonth }));
    setNewCategoryName('');
  };

  const handleClick = (month, category) => {
    if ((category.time.hour || category.time.minute) > 0) {
      return setError('Clear time first');
    }
    dispatch(removeCategory(month, category));
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
      {categories.map((month, i) =>
        month.nameOfMonth === nameOfMonth ? (
          <div key={i}>
            {month.monthCategories.map((category, i) =>
              category.categoryName === 'None' ? (
                ''
              ) : (
                <div key={i}>
                  <p>{category.categoryName}</p>
                  <p>{`${category.time.hour} h ${category.time.minute} min`}</p>
                  <button
                    onClick={(e) => handleClick(month.nameOfMonth, category)}
                  >
                    X
                  </button>
                </div>
              )
            )}
          </div>
        ) : (
          ''
        )
      )}
    </div>
  );
};

export default Categories;
