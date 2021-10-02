import React from 'react';
import { PomodoroTimer } from './components/pomodoro/';

const App:React.FC = () => {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTimer={1500} // 1500 //10
        shortRestTime={300} // 300 // 2
        longRestTime={900} // 900 // 5
        cycles={4}
      />
    </div>
  );
}

export default App;
