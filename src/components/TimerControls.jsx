import React from 'react'
//renderização dinamica ao clicar no timerOn
const TimerControls = ({onStart, onStop, timerOn, onReset, onLap}) => {
  return (
    <div className='Timer-controls'>
      {!timerOn && <button onClick={onStart}>Iniciar</button>} 
      {timerOn && <button onClick={onStop}>Parar</button>}
      {timerOn && <button onClick={onLap} >Volta</button>}

        <button onClick={onReset}>Zerar</button>
    </div>
  ) 
}

export default TimerControls