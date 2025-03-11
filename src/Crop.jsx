import { useContext } from "react"
import { TimeContext } from "./TimeContext"
import PlantStats from "./PlantStats"
import "./CropImage.css"

export default function Crop(props) {
    // Timer for each crop
    const [startTime, currentTime, timeStep] = useContext(TimeContext)
    const growingTime = currentTime - props.plantTime
    
    // Set values for each crop onto object
    if (props.currentCrop === 'corn') {
        const growthStage = Math.floor(Math.min(((growingTime / props.cropRequiredGrowTime) * 3) + 1, 4))
        return <div>
            <img src={`./assets/corn/Corn_stage_${growthStage}.png`} alt="" width={'100%'} style={{imageRendering:'pixelated'}} className="crop-image" />
        </div>
    } else if (props.currentCrop === 'soybean') {
        const growthStage = Math.floor(Math.min(((growingTime / props.cropRequiredGrowTime) * 3) + 1, 4))
        return <div>
            <img src={`./assets/soybean/Soybean_stage_${growthStage}.png`} alt="" width={'100%'} style={{imageRendering: 'pixelated'}} className="crop-image" />
        </div>
    }
}
