import React from "react";
import { secondsToMinutes } from "../../utils/secondsToMinutes";

interface ITimer {
  mainTimer: number
}

export const Timer:React.FC<ITimer> = ({mainTimer}) => {
  return (
    <div className="timer">
      {secondsToMinutes(mainTimer)}
    </div>
  )
}