import Logo from '../assets/Logo2.png'
import { Link } from 'react-router-dom';


function Home() {
    // const [count, setCount] = useState(0)
  
    return (
      <div className="Home">
       {/* <h1>Hello</h1> */}
       <img src={Logo} alt="logo" width="500px" className='imgLog'/>
       <div className='buttons'>
       <Link to="/explore">
       <button>Explore</button>
       </Link>
       <Link to="/post">
       <button>Post</button>
       </Link>
       </div>
      </div>
    )
  }
  
  export default Home
  