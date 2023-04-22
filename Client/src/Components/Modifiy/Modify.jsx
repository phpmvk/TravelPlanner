import { Link } from 'react-router-dom';
import './Modify.css'
import { getTripsByUser/*, getActivitiesByTripId */} from "../../api.service"
import { useState } from 'react';

function Modify() {
  const [trips, setTrips] = useState([]);

  const handleSubmit = async function(e){
    e.preventDefault();
    
    const searchedUser = {
        user: e.target[0].value,
    }

    const constructSearchUrl = function () {
        const arrRes = ["http://localhost:3001/modify?user="];
        arrRes.push(searchedUser.user);
        return arrRes.join("");
    };
    
    const url = constructSearchUrl();

    const resultOfSearch = await getTripsByUser(url);

    setTrips(resultOfSearch);
    
    e.target.reset()
  }
  
  const renderTrips = () => {
    if (trips.length === 0) {
      return null;
    }
    return trips.map((trip) => {
      return (
        <div className="trip-card" key={trip.id}>
          <h3>{trip.name}</h3>
          <p>User: {trip.user}</p>
          <p>Departure City: {trip.depCity}</p>
          <p>Arrival City: {trip.arrCity}</p>
          <p>Budget: {trip.budget}</p>
          <p>Duration: {trip.duration} days</p>
        </div>
      );
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>UserName</h4>
        <input className="inputs" placeholder="Name"></input>
        <button className="button" type="submit">Create</button>
      </form>

      {renderTrips()}

      <Link to="/">
        <button className="button">Home</button>
      </Link>
    </div>
  );
}

export default Modify

