import { Link } from 'react-router-dom';

function Explore() {
  
    return (
      <div className="Explore">
       <h1>Explore</h1>
       <Link to="/">
            <button className="button">Home</button>
        </Link>
      </div>
    )
  }
  
  export default Explore