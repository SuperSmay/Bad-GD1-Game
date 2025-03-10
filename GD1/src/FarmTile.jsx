import { useContext, useEffect, useState } from 'react'
import Crop from './Crop';
import { TimeContext } from './TimeContext.js';
import { ToolContext } from './ToolContext.js';
import { ScoreContext } from './ScoreContext.js';
import PlantStats from './PlantStats.js';

export default function FarmTile() {

    const [water, setWater] = useState(0)

    const [currentCrop, setCurrentCrop] = useState('')
    const [plantTime, setPlantTime] = useState(0)  // Timestamp for seed plant

    const [startTime, currentTime] = useContext(TimeContext)
    const [tool, setTool] = useContext(ToolContext)
    const [foodPoints, setFoodPoints] = useContext(ScoreContext)
    

    function onCellClick() {
        if (tool === 'Sickle') {
            // Figure out if plant is grown
            const cropRequiredGrowTime = PlantStats[currentCrop].growTime
            const cropGrowingTime = currentTime - plantTime
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
            console.log("Water!")
        }
    }
    

    return <div style={{width:100, height:100, backgroundColor:`brown`}} onClick={onCellClick}>
        <Crop plantTime={plantTime} currentCrop={currentCrop} />
    </div>
}