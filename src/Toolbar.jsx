import { useContext, useEffect } from "react"
import { ToolContext } from "./ToolContext"

export default function Toolbar() {

    const [tool, setTool] = useContext(ToolContext)

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

        document.addEventListener('keydown', onKeyPress)

        return () => {
            document.removeEventListener('keydown', onKeyPress)
        }
    }, [])

    return <div>
        <button onClick={() => setTool("Sickle")}>Sickle (1)</button>
        <button onClick={() => setTool("Water")}>Water (2)</button>
        <button onClick={() => setTool("Seed")}>Seed (3)</button>
    </div>
}