import { useContext, useEffect } from "react"
import { ToolContext } from "./ToolContext"

// Code for tools
export default function Toolbar() {

    const [tool, setTool] = useContext(ToolContext)

    // This function listens for keyboard input, and changes the tool
    useEffect(() => {
        function onKeyPress(e) {
            if (e.key === '1') {
                setTool("Sickle")
            }
            if (e.key === '2') {
                setTool("Water")
            }
            if (e.key === '3') {
                setTool("Seed")
            }
        }

        // Trigger when you press a key (instead of letting go etc)
        document.addEventListener('keydown', onKeyPress)

        return () => {
            document.removeEventListener('keydown', onKeyPress)
        }
    }, [])

    // Toolbar text
    return <div>
        <button onClick={() => setTool("Sickle")}>Sickle (1)</button>
        <button onClick={() => setTool("Water")}>Water (2)</button>
        <button onClick={() => setTool("Seed")}>Seed (3)</button>
    </div>
}
