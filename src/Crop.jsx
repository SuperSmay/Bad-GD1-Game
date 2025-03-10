import { useContext } from "react"
import { TimeContext } from "./TimeContext"
import PlantStats from "./PlantStats"


export default function Crop(props) {
    

    

    const [startTime, currentTime, timeStep] = useContext(TimeContext)
    
    
    
    if (props.currentCrop === 'corn') {
        const timeToCompletion = PlantStats.corn.growTime
        const growingTime = currentTime - props.plantTime
        const growthStage = Math.floor(Math.min(((growingTime / timeToCompletion) * 3) + 1, 4))
        return <div>
            <img src={`./assets/corn/Corn_stage_${growthStage}.png`} alt="" width={100} style={{pointerEvents: 'none'}} />
        </div>
       
    }
}