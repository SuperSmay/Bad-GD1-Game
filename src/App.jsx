import Round from './Round'
import './App.css'
import { useState } from 'react'
import { SceneContext } from './SceneContext'


function App() {

  const [scene, setScene] = useState('mainMenu')

  return <SceneContext value={[scene, setScene]}>
    { scene === 'mainMenu' ? 

    // Code for main menu
    <div>
      <h1>Bloomfield Farm</h1>
      <p>Celestia Studio</p>
      <button onClick={() => {setScene('round')}}>Start!</button>
    </div> : <></>
    }

    { scene === 'round' ? 
    // Code the game round
    <div>
      <Round />
    </div> : <></>
    }
  
    { scene === 'end' ? 
    // Code for end
    // TODO: Maybe include the final score here:
    <div>
      <p>Game Over!!</p>
      <button onClick={() => setScene('mainMenu')}>Back to main</button>
    </div> : <></>
    }
  
  </SceneContext>

  
  
}

export default App
