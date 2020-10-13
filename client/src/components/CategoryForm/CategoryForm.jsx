import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
import { addNewCategory } from '../../redux/categories/categories.actions';
import NotificationMessage from '../NotificationMessage/NotificationMessage';

const CategoryForm = ({ nameOfMonth }) => {
  const dispatch = useDispatch();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategoryName.length === 0) {
      return setError('Please provide a name!');
    }

    dispatch(addNewCategory({ newCategoryName, nameOfMonth }));
    setNewCategoryName('');
    setError('');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        onFocus={(e) => setError('')}
        placeholder="Category name..."
        value={newCategoryName}
        onChange={(e) => {
          setNewCategoryName(e.target.value);
        }}
      ></input>
      <NotificationMessage message={error}></NotificationMessage>
      <CustomButton type="submit">Create new category</CustomButton>
    </form>
  );
};

export default CategoryForm;
