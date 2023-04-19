import { useState } from 'react'
import Logo from './assets/Logo2.png'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
     {/* <h1>Hello</h1> */}
     <img src={Logo} alt="logo" width="500px" className='imgLog'/>
     <div className='buttons'>
     <button>Explore</button>
     <button>Post</button>
     </div>
    </div>
  )
}

export default App
