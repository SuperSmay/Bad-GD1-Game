import { useContext } from "react"
import { TimeContext } from "./TimeContext"


export default function Crop(props) {
    

    const cornTimeToCompletion = 10000

    const [startTime, currentTime] = useContext(TimeContext)
    
    const growingTime = currentTime - props.plantTime

    const growthStage = Math.floor(Math.min(((growingTime / cornTimeToCompletion) * 3) + 1, 4))
    
    if (props.currentCrop === 'corn') {
        return <div>
            <img src={`/src/assets/corn/Corn_stage_${growthStage}.png`} alt="" width={100}/>
        </div>
       
    }
}