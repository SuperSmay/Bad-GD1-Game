import { useState, useEffect } from 'react'
import FarmTile from './FarmTile'
import Toolbar from './Toolbar.jsx';
import './App.css'
import { TimeContext } from './TimeContext.js';
import { ToolContext } from './ToolContext.js';
import { Row, Col, Container } from "react-bootstrap"

function App() {

  const [currentTime, setCurrentTime] = useState(Date.now())
  const [startTime, setStartTime] = useState(Date.now())
  const [tool, setTool] = useState('')

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
        

        loop = requestAnimationFrame(tick)
    }

    tick()

      // Cleanup the interval when the component unmounts
      return () => cancelAnimationFrame(loop);
}, [])

  return (
    <>
      <TimeContext value={[startTime, currentTime]}>
        <ToolContext value={[tool, setTool]}>
          <Toolbar />
          <p>{tool}</p>
          <div style={{display:'inline-grid', gridTemplateColumns:'100px 100px 100px'}}>
            <FarmTile />
            <FarmTile />
            <FarmTile />
            <FarmTile />
            <FarmTile />
            <FarmTile />
            <FarmTile />
            <FarmTile />
            <FarmTile />
          </div>
          
          
        </ToolContext>
        
      </TimeContext>
    </>
  )
}

export default App
