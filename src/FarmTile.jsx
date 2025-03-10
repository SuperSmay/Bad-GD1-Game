import { useContext, useEffect, useState } from 'react'
import Crop from './Crop';
import { TimeContext } from './TimeContext.js';
import { ToolContext } from './ToolContext.js';
import { ScoreContext } from './ScoreContext.js';
import PlantStats from './PlantStats.js';

export default function FarmTile() {

    const [water, setWater] = useState((Math.random() * 0.25) + 0.75)
    const [lastWaterTime, setLastWaterTime] = useState(Date.now())
    // const [waterCount, setWaterCount] = useState(0)

    const [currentCrop, setCurrentCrop] = useState('')
    const [plantTime, setPlantTime] = useState(Date.now())  // Timestamp for seed plant

    const [startTime, currentTime, timeStep] = useContext(TimeContext)
    const [tool, setTool] = useContext(ToolContext)
    const [foodPoints, setFoodPoints] = useContext(ScoreContext)

    const cropGrowingTime = currentTime - plantTime

    const waterDrainTime = 25
    const waterSittingTime = currentTime - lastWaterTime
    const calcCurrentWaterValue = Math.max(water - (waterSittingTime/waterDrainTime)/1000, 0) // + (waterCount * 1)

    useEffect(() => {

    }, [])
    
    function handleWater() {
        setLastWaterTime(Date.now())
        setWater(1)
    }

    function onCellClick() {
        if (tool === 'Sickle') {
            if (currentCrop === '') return
            // Figure out if plant is grown
            const cropRequiredGrowTime = PlantStats[currentCrop].growTime
            
            if (cropGrowingTime > cropRequiredGrowTime) {
                setFoodPoints((prev) => prev + 10)
            }
            setCurrentCrop('')
        }
        if (tool === 'Seed') {
            setCurrentCrop('corn')
            setPlantTime(Date.now())
        }
        if (tool === 'Water') {
            handleWater()
        }
    }

    function onCellMouseEnter(e) {
        if (!e.buttons) return
        if (tool === 'Water') {
            handleWater()
        }
    }
    

    return <div style={{width:100, height:100, backgroundColor:`hsl(33, ${30 + (35 * calcCurrentWaterValue)}%, ${60 - ((calcCurrentWaterValue) * 50)}%)`}} onClick={onCellClick} onMouseEnter={onCellMouseEnter}>
        <Crop plantTime={plantTime} currentCrop={currentCrop} />
        {/* <p>{Math.trunc(calcCurrentWaterValue * 100)/100}</p> */}
    </div>
}