import React from 'react';
import CustomButton from '../CustomButton/CustomButton';

const TaskNoCategory = ({
  task,
  handleDelete,
  checkForCategory,
  handleChange,
}) => {
  return (
    <li className="task-container" data-id={task.id}>
      <input
        type="checkbox"
        checked={task.completed}
        disabled={checkForCategory(task.category) ? false : true}
        onChange={(e) => handleChange(e)}
      ></input>
      <p>{task.name}</p>
      <CustomButton onClick={handleDelete}>X</CustomButton>
    </li>
  );
};

export default TaskNoCategory;
