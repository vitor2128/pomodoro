import React, { useCallback, useEffect, useState } from "react";
import useSound from 'use-sound';

import { Button } from "../button";
import { Timer } from "../timer";

import { useInterval } from "../../hooks/useInterval";
import { secondsToTime } from "../../utils/secondsToTime";

import bellStart from "../../sounds/start.mp3";
import bellStop from "../../sounds/finish.mp3";


interface IPomodoro {
  pomodoroTimer: number
  shortRestTime: number
  longRestTime: number
  cycles: number
}

export const PomodoroTimer:React.FC<IPomodoro> = ({
    pomodoroTimer,
    longRestTime,
    shortRestTime,
    cycles
  }) =>  {
  const [mainTime, setMainTime] = useState(pomodoroTimer)
  const [timeCounting, setTimeCounting] = useState(false)
  const [working, setWorking] = useState(false)
  const [resting, setResting] = useState(false)
  const [cyclesQtdMaganer, setCyclesQtdMaganer] = useState(new Array(cycles - 1).fill(true))
  
  const [completedCycles,  setCompletedCyles] = useState(0)
  const [fullWorkingTime,  setFullWorkingTime] = useState(0)
  const [numberOfPomodoros,  setNumberOfPomodoros] = useState(0)

  const [start] = useSound(bellStart);
  const [stop] = useSound(bellStop);

  const handleWork = useCallback(() => {
    setTimeCounting(true)
    setWorking(true)
    setResting(false)
    setMainTime(pomodoroTimer)

    start()
    
  },[start, pomodoroTimer])

  const handleRest = useCallback((long: boolean) => {
    setTimeCounting(true)
    setWorking(false)
    setResting(true)

    if(long){
      setMainTime(longRestTime)
    } else {
      setMainTime(shortRestTime)
    }

    stop();
  },[longRestTime, shortRestTime, stop])

  useEffect(() => {
    if(working) document.body.classList.add('working')
    if(resting) document.body.classList.remove('working')

    if(mainTime > 0) return;

    if(working && cyclesQtdMaganer.length > 0) {
      handleRest(false)
      cyclesQtdMaganer.pop();
    } else if (working && cyclesQtdMaganer.length <= 0 ) {
      handleRest(true);
      setCyclesQtdMaganer(new Array(cycles - 1).fill(true))
      setCompletedCyles(completedCycles + 1);
    } 

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if(resting) handleWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdMaganer,
    handleRest,
    cycles,
    numberOfPomodoros,
    completedCycles,
    handleWork
  ])

  useInterval(() => {
    setMainTime(mainTime - 1)
    if(working) setFullWorkingTime(fullWorkingTime + 1)
  }, timeCounting ? 1000 : null)

  return (
    <div className='pomodoro'>
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>

      <Timer mainTimer={mainTime} />

      <div className="controls">
        {/* <Button
          text={working ? 'Zerar' : 'Trabalhar'}
          onClick={() => handleWork()}
        /> */}
        {timeCounting && (
          <Button
          text={working ? 'Zerar' : 'Trabalhar'}
          onClick={() => handleWork()}
        />
        )}
        {!timeCounting && (
          <Button
          text={working ? 'Trabalhar' : 'Zerar'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
        )}

        <Button
          text={resting ? 'Zerar' : 'Descanso'}
          onClick={() => handleRest(false)}
        />

        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>

      <div className="details">
        <p>Ciclos concluidos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros concluidos: {numberOfPomodoros}</p>
      </div>

    </div>
  )
}