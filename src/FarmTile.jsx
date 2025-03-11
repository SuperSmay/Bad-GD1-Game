import { useContext, useEffect, useState } from 'react'
import Crop from './Crop';
import { TimeContext } from './TimeContext.js';
import { ToolContext } from './ToolContext.js';
import { ScoreContext } from './ScoreContext.js';
import PlantStats from './PlantStats.js';
import './WaterDrop.css'
import './CropImage.css'
import './Shadow.css'

export default function FarmTile() {

    // start each tile with a random amount of water (0.75 to 1)
    const [water, setWater] = useState((Math.random() * 0.25) + 0.75)
    const [lastWaterTime, setLastWaterTime] = useState(Date.now())
    // const [waterCount, setWaterCount] = useState(0)

    // Start tile with no
    const [currentCrop, setCurrentCrop] = useState('')
    const [plantTime, setPlantTime] = useState(Date.now())  // Timestamp for seed plant

    const [startTime, currentTime, timeStep] = useContext(TimeContext)
    const [tool, setTool] = useContext(ToolContext)
    const [foodPoints, setFoodPoints] = useContext(ScoreContext)

    const cropGrowingTime = currentTime - plantTime

    // Deal with how much water is left in the tile
    const waterDrainTime = 50
    const waterSittingTime = currentTime - lastWaterTime
    const calcCurrentWaterValue = Math.max(water - (waterSittingTime/waterDrainTime)/1000, 0) // + (waterCount * 1)

    // Figure out if plant is grown
    const [cropRequiredGrowTime, setCropRequiredGrowTime] = useState(0)

    useEffect(() => {
        // If we run out of water, kill the crop
        if (calcCurrentWaterValue === 0) {
            setCurrentCrop('')
        }
    }, [currentTime])


    // Make crop go slower with less water
    // Not working so far
    useEffect(() => {
        const interval = setInterval(() => {
            // Make the crop grow slower, double the time if there is no water, less if there is more water
            setCropRequiredGrowTime(prev => prev + (1 - calcCurrentWaterValue) * 1000)  // TODO: This is not quite working and I'm not sure why
        },  1000);

        return () => clearInterval(interval);
    }, []);
    
    // Function to water the plant
    function handleWater() {
        setLastWaterTime(Date.now())
        setWater(1)
    }

    // Function to handle using the tool on the tile
    function onCellClick() {
        if (tool === 'Sickle') {
            // Do nothing if there is no crop
            if (currentCrop === '') return
            
            
            if (cropGrowingTime > cropRequiredGrowTime) {
                setFoodPoints((prev) => prev + PlantStats[currentCrop].value)
            }
            setCurrentCrop('')
        }
        if (tool === 'Corn Seeds') {
            setCurrentCrop('corn')
            setPlantTime(Date.now())
            setCropRequiredGrowTime(PlantStats.corn.growTime)
        }
        if (tool === 'Soybean Seeds') {
            setCurrentCrop('soybean')
            setPlantTime(Date.now())
            setCropRequiredGrowTime(PlantStats.soybean.growTime)
        }
        if (tool === 'Water') {
            handleWater()
        }
    }

    // Handle tools to work when dragging
    function onCellMouseEnter(e) {
        if (!e.buttons) return

        // Water plants when dragging
        if (tool === 'Water') {
            handleWater()
        }
    }
    

    // https://stackoverflow.com/questions/1909648/stacking-divs-on-top-of-each-other
    // Using this trick to overlay multiple divs. position: absolute doesn't work well because I want to keep the 100% size working
    return <div style={{height:'100%', aspectRatio:'1', backgroundColor:`hsl(33, ${30 + (35 * calcCurrentWaterValue)}%, ${60 - ((calcCurrentWaterValue) * 50)}%)`, display:'grid', gridTemplate:'1fr / 1fr', placeItems:'center'}} onClick={onCellClick} onMouseEnter={onCellMouseEnter}>
        <div style={{gridColumn: '1 / 1', gridRow: '1 / 1', height:'100%', aspectRatio:'1'}}> 
            <Crop plantTime={plantTime} currentCrop={currentCrop} />
        </div>
        {calcCurrentWaterValue < 0.5 && calcCurrentWaterValue > 0.1 && currentCrop? <div style={{gridColumn: '1 / 1', gridRow: '1 / 1', height:'100%', aspectRatio:'1', opacity:'75%'}}>
            <img src="assets/Droplet.png" width='75%' alt="" style={{imageRendering:'pixelated'}} className='animate-flicker crop-image shadow'/>
        </div> : <></>}
        {calcCurrentWaterValue < 0.1 ? <div style={{gridColumn: '1 / 1', gridRow: '1 / 1', height:'100%', aspectRatio:'1', opacity:'75%'}}>
            <img src="assets/XDroplet.png" width='75%' alt="" style={{imageRendering:'pixelated'}} className='animate-flicker crop-image shadow'/>
        </div> : <></>}
        {cropGrowingTime > cropRequiredGrowTime && currentCrop !== '' ? <div style={{gridColumn: '1 / 1', gridRow: '1 / 1', height:'100%', aspectRatio:'1', opacity:'75%'}}>
            <img src="assets/Sickle.png" width='75%' alt="" style={{imageRendering:'pixelated'}} className='animate-flicker crop-image shadow'/>
        </div> : <></>}
        
        {/* <p>{Math.trunc(calcCurrentWaterValue * 100)/100}</p> */}
    </div>
}
