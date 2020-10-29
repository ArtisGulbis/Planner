import React from 'react';
import './customButton.styles.scss';

const CustomButton = ({ children, type, onClick, classes }) => {
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default CustomButton;
