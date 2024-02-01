import {useEffect, useState} from 'react'
import TimerDisplay from './TimerDisplay'
import TimerControls from './TimerControls';
import LapList from './LapList';
import "../style/Timer.css"

const Timer = () => {
const [milliseconds, setMilliseconds] = useState(0);
const [timerOn, settimerOn] = useState(false);
const [laps, setLaps] = useState([]);

const formatTime = () => {
    const minutes = ("0" + (Math.floor(milliseconds / 60000) %60)).slice(-2); //slice pra poder aparecer só o digito que quer ou seja sem varias casa decimais
    const seconds = ("0" + (Math.floor(milliseconds / 1000) %60)).slice(-2);
    const centSeconds = ("0" + (Math.floor(milliseconds / 10) %100)).slice(-2);
    return `${minutes}:${seconds}:${centSeconds}`;
};

const resetTimer = () => {
  setMilliseconds(0);
  settimerOn(false);
  setLaps([]);
}
//addLap: esses ... é para jogar todas as voltas que ja estão + a seguinte, pra mostrar todas as laps e não apagr uma e mostrar a próxima
const addLap = () => {
  setLaps([...laps, formatTime()])
}

const stopTimer = (interval) => {
  clearInterval(interval)
  return interval; //sempre usando o interval pra iniciar e parar o time
}
//estado que começa a contar o tempo, recebe um intervalo como argumento
//vai returnar setIntrval que mexe no setmilliseconds pra alterar o tempo
const startTimer = (interval) => {
  return setInterval(() => {
    setMilliseconds((prevMilliseconds) => prevMilliseconds + 10)
  }, 10);
};
//useEfect ele roda oque tiver nele com base em algum estado que você coloque
useEffect(() => {
  let interval = null;
  if(timerOn) {
    interval = startTimer(interval);
  } else {
    interval = stopTimer(interval);
  }
  return () => stopTimer(interval) //vai ajudar a limpar a memória
}, [timerOn])


// veja no return 'time' virou uma propriedade do componente
  return (
  <div className='Timer-container'>
        <TimerDisplay time={formatTime()}/> 
        <TimerControls
        timerOn = {timerOn} 
        onStart = {() => settimerOn(true)}
        onStop = {() => settimerOn(false)}
        onReset = {resetTimer}
        onLap = {addLap}
        />
        <LapList laps = {laps}/>
    </div>
  );
}

export default Timer