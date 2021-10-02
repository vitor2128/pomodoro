import React from "react";

interface IButton  {
  onClick: () => void;
  text: string
  className?: string
}

export const Button:React.FC<IButton> = ({onClick,  text, className}) => {
  return(
    <button onClick={onClick} className={className}>
      {text}
    </button>
  )
}