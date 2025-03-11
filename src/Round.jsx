import { useState, useEffect, useContext } from 'react'
import FarmTile from './FarmTile.jsx'
import Toolbar from './Toolbar.jsx';
import './App.css'
import { TimeContext } from './TimeContext.js';
import { ToolContext } from './ToolContext.js';
import { ScoreContext } from './ScoreContext.js';
import { SceneContext } from './SceneContext.js';

export default function Round() {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [startTime, setStartTime] = useState(Date.now())
  const [timeStep, setTimeStep] = useState(0)
  const [tool, setTool] = useState('Water')
  const [foodPoints, setFoodPoints] = useState(0)

  const [scene, setScene] = useContext(SceneContext)

  //               mins secs ms
  const roundLen = 3 * 60 * 1000

  const gridSize = 5
  const gridWidth = Math.round((600 - (80*2)) / gridSize)

  // Adapted from https://medium.com/@primaramadhanip/building-a-countdown-timer-in-react-db93167157b7
  useEffect(() => {
    // const timerInterval = setInterval(() => {
    //     setWater((prev) => {
    //       if (prev === 100) {
    //         // clearInterval(timerInterval);
    //         // Perform actions when the timer reaches zero
    //         console.log('Water full');
    //         return 0;
    //       } else {
    //         return prev + 1;
    //       }
    //     });

    //     if (currentCrop !== '') {
    //         setCurrentTimeTowardsCompletion((old) => {return old + 100})
    //     }
    //   }, 100);

    let loop;
 
    function tick(prevTime) {
        let newTime = Date.now()
        let timeDelta = prevTime ? newTime - prevTime : 0
        setCurrentTime(newTime)
        setTimeStep(timeDelta)
        
        if (newTime - startTime > roundLen) {
            setScene('end')
        }

        loop = requestAnimationFrame(() => {tick(newTime)})
    }

    tick()

      // Cleanup the interval when the component unmounts
      return () => cancelAnimationFrame(loop);
}, [])

    /**
     * This function converts milliseconds to a string in the format mm:ss
     *
     * Copied straight from the Google AI Overview after searching "js ms to time", then I removed the hours part. It nailed it.
     * @param {Number} ms Duration in ms
     * @returns {String} The duration in mm:ss
     */
    function msToTime(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)));
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    }

  return (
    // This contains the page for the main game loop
    <>
      <TimeContext value={[startTime, currentTime, timeStep]}>
        <ScoreContext value={[foodPoints, setFoodPoints]}>
          <ToolContext value={[tool, setTool]}>
            <p>Time remaining: {msToTime(roundLen - (currentTime - startTime))}</p>
            <p>Current Score: {foodPoints}</p>
            <Toolbar />
            <p>Frame time: {timeStep}ms</p>
            <p>Tool: {tool}</p>
            <div style={{display:'inline-grid', gridTemplateColumns:`${(gridWidth + "px ").repeat(gridSize)}`, padding: '80px', backgroundImage:'url(Background.png)'}}>
              {
                [...Array(gridSize * gridSize).keys()].map((i) => {
                  return <FarmTile key={i} />
                })
              }
            </div>
          </ToolContext>
        </ScoreContext>
        
        
      </TimeContext>
    </>
  )
}
