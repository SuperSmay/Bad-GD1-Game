import { useContext, useEffect, useState } from 'react'
import Crop from './Crop';
import { TimeContext } from './TimeContext.js';
import { ToolContext } from './ToolContext.js';

export default function FarmTile() {

    const [water, setWater] = useState(0)

    const [currentCrop, setCurrentCrop] = useState('')

    const [startTime, currentTime] = useContext(TimeContext)
    const [tool, setTool] = useContext(ToolContext)
    const [plantTime, setPlantTime] = useState(0)  // Timestamp for seed plant

    function onCellClick() {
        if (tool === 'Sickle') {
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