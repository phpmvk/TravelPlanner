import { Link, useParams } from 'react-router-dom';


// console.log(params);

function Trip() {
    const params = useParams()
  
    return (
      <div className="Trip">
       <h1>Trip</h1>

       <Link to="/activity">
                <button className="button">Post an Activity</button>
            </Link>
            <Link to="/journey">
                <button className="button">Post a Journey</button>
            </Link>

       <Link to="/">
            <button className="button">Home</button>
        </Link>
      </div>
    )
  }
  
  export default Trip