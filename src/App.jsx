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
      <h1>Name TBD!</h1>
      <p>By: Team 1</p>
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
    <div>
      <p>You win!!</p>
      <button onClick={() => setScene('mainMenu')}>Back to main</button>
    </div> : <></>
    }
  
  </SceneContext>

  
  
}

export default App
