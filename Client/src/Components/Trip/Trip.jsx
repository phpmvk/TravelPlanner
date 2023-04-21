import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getTrip } from '../../api.service'


// console.log(params);

function Trip() {
    const id = useParams();
    console.log(id.idTrip);
    const [trip, setTrip] = useState(null);
  
    useEffect(() => {
      const fetchTrip = async () => {
        const data = await getTrip(id.idTrip);
        console.log(data);
        setTrip(data);
      };
      fetchTrip();
    }, []);
  
  
    console.log("trip", trip);
    return (
      <div className="Trip">
            <h1>{ trip && trip.name}</h1>
      <p>User: { trip && trip.user}</p>
      <p>Departure City: { trip && trip.depCity}</p>
      <p>Arrival City: { trip && trip.arrCity}</p>
      <p>Budget: { trip && trip.budget}</p>
      <p>Duration: { trip && trip.duration}</p>
            
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