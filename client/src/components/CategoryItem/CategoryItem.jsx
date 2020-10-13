import React from 'react';
import CustomButton from '../CustomButton/CustomButton';

const CategoryItem = ({ category, handleClick, month }) => {
  return (
    <li>
      <p>{category.categoryName}</p>
      <p>{`${category.time.hour} h`}</p>
      <p>{`${category.time.minute} min`}</p>
      <CustomButton onClick={(e) => handleClick(month.nameOfMonth, category)}>
        X
      </CustomButton>
    </li>
  );
};

export default CategoryItem;
