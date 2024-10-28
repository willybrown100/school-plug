import React from 'react'

export default function Button({children,className,onClick,disable}) {
  return (
    <button
      onClick={onClick}
      
      disabled={disable}
      className={`bg-secondary600 ${className} p-2 text-white rounded-md font-semibold capitalize`}
    >
      {children}
    </button>
  );
}
