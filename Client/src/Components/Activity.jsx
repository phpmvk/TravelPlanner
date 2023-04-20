import { Link } from 'react-router-dom';

function Activity() {
  
    return (
      <div className="Activity">
       <h1>Activity</h1>
       <Link to="/post">
            <button className="button">Back to post trip</button>
        </Link>
      </div>
    )
  }
  
  export default Activity