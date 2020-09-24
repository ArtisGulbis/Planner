import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Categories = () => {
  // const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.cat);

  return (
    <div>
      {categories.map((category, i) => {
        return (
          <div key={i}>
            <h2>{category.name}</h2>
            <h3>{`${category.time.hour} h ${category.time.minute} min`}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
