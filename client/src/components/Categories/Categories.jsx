import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCategory } from '../../redux/categories/categories.actions';
import CategoryItem from '../CategoryItem/CategoryItem';
import CategoryForm from '../CategoryForm/CategoryForm';
const Categories = () => {
  const dispatch = useDispatch();
  const { nameOfMonth } = useSelector(
    (state) => state.monthReducer.currentMonth
  );
  const categories = useSelector((state) => state.categoriesReducer.data);

  const handleClick = (month, category) => {
    dispatch(removeCategory(month, category));
  };

  const createRenderData = () => {
    const data = categories.map((month, i) =>
      month.nameOfMonth === nameOfMonth ? (
        <ul key={i}>
          {month.monthCategories.map((category, i) =>
            category.categoryName === 'None' ? (
              ''
            ) : (
              <CategoryItem
                category={category}
                key={i}
                handleClick={handleClick}
                month={month}
              ></CategoryItem>
            )
          )}
        </ul>
      ) : (
        ''
      )
    );
    return data;
  };

  return (
    <section>
      <CategoryForm nameOfMonth={nameOfMonth}></CategoryForm>
      {createRenderData()}
    </section>
  );
};

export default Categories;
