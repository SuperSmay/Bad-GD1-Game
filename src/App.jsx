import Round from './Round'
import './App.css'
import { useState } from 'react'
import { SceneContext } from './SceneContext'


function App() {

  const [scene, setScene] = useState('mainMenu')

  return <SceneContext value={[scene, setScene]}>
    { scene === 'mainMenu' ? 
    <div>
      <button onClick={() => {setScene('round')}}>Start!</button>
    </div> : <></>
    }

    { scene === 'round' ? 
    <div>
      <Round />
    </div> : <></>
    }
  
    { scene === 'end' ? 
    <div>
      <p>You win!!</p>
      <button onClick={() => setScene('mainMenu')}>Back to main</button>
    </div> : <></>
    }
  
  </SceneContext>

  
  
}

export default App
