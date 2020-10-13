import React from 'react';

const CustomButton = ({ children, type, onClick, classes }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
