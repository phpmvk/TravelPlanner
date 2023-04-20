import { Link } from 'react-router-dom';

function Result() {
  
    return (
      <div className="Result">
       <h1>Result</h1>
       <Link to="/">
            <button className="button">Home</button>
        </Link>
      </div>
    )
  }
  
  export default Result