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

    const [cropRequiredGrowTime, setCropRequiredGrowTime] = useState(0)

    // Frame based updating happens in here - Useful for updating state in a less linear way
    useEffect(() => {
        // If we run out of water, kill the crop
        if (calcCurrentWaterValue === 0) {
            setCurrentCrop('')
        }

        const waterValueDelayCutoff = 0.5
        // Make the crop grow slower if low on water
        if (calcCurrentWaterValue < waterValueDelayCutoff) {
            const frameCountPunishment = 2  // if the water level is at 0 (which kills the crop but aside from that), how many extra frames does the crop need to grow for? 
            // A value of 1 means that at 0 water growth simply "stops", then resumes with water. A value greater than 1 means that extra time is added.
            // Given that most times this will be quickly resolved by the player, (short time frame and still fairly high water value) a larger value that produces noticeable variation may be ideal
            setCropRequiredGrowTime(prev => prev + ((waterValueDelayCutoff-calcCurrentWaterValue) * (1/waterValueDelayCutoff) * frameCountPunishment * timeStep))  // Applies the water delay. 
            // Any amount past the cutoff point is normalized into a ratio from cutoff -> 0, then multiplied by the punishment value, then the last frame duration.
            // This means that if the crop reaches 0 water, `frameCountPunishment` extra frames worth of milliseconds are added, and less for more remaining water.
        }

    }, [currentTime])


    // Make crop go slower with less water
    // Not working so far
    // useEffect(() => {
    //     const interval = setInterval(() => {
            
    //     },  1000);

    //     return () => clearInterval(interval);
    // }, []);
    
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
            <Crop plantTime={plantTime} currentCrop={currentCrop} cropRequiredGrowTime={cropRequiredGrowTime}/>
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
