import { useState, useEffect, useContext } from 'react'
import FarmTile from './FarmTile.jsx'
import Toolbar from './Toolbar.jsx';
import './App.css'
import { TimeContext } from './TimeContext.js';
import { ToolContext } from './ToolContext.js';
import { ScoreContext } from './ScoreContext.js';
import { SceneContext } from './SceneContext.js';
import { Row, Col, Container } from "react-bootstrap"

export default function Round() {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [startTime, setStartTime] = useState(Date.now())
  const [tool, setTool] = useState('')
  const [foodPoints, setFoodPoints] = useState(0)

  const [scene, setScene] = useContext(SceneContext)

  const roundLen = 3 * 60 * 1000

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
 
    function tick() {
        let newTime = Date.now()

        setCurrentTime(newTime)
        
        if (newTime - startTime > roundLen) {
            setScene('end')
        }

        loop = requestAnimationFrame(tick)
    }

    tick()

      // Cleanup the interval when the component unmounts
      return () => cancelAnimationFrame(loop);
}, [])

    /**
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
    <>
      <TimeContext value={[startTime, currentTime]}>
        <ScoreContext value={[foodPoints, setFoodPoints]}>
          <ToolContext value={[tool, setTool]}>
            <p>Time remaining: {msToTime(roundLen - (currentTime - startTime))}</p>
            <p>Current Score: {foodPoints}</p>
            <Toolbar />
            <p>{tool}</p>
            <div style={{display:'inline-grid', gridTemplateColumns:'100px 100px 100px 100px 100px 100px'}}>
              {
                [...Array(36).keys()].map((i) => {
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