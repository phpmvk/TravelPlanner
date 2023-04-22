import { Link } from "react-router-dom";
import "./Modify.css";
import { getTripsByUser, deleteJourney,deleteActivity } from "../../api.service";
import { useState } from "react";
import moment from "moment";

function Modify() {
  const [trips, setTrips] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  const putCapLet = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const prettyDate = function(date) {
    return moment(date).format("dddd HH:mm")
  }

  function lowerCase(string) {
    return string.toLowerCase();
  }

  const handleDeleteJourney = async (journeyId) => {
    try {
      const deletedJourney = await deleteJourney(journeyId);
    //   console.log("Journey deleted:", deletedJourney);
  
      setTrips(prevState => prevState.map(trip => {
        const updatedJourneys = trip.journeys.filter(journey => journey.id !== journeyId);
        // const updatedActivities = trip.activities.filter(activity => activity.id !== journeyId);
        return {
          ...trip,
          journeys: updatedJourneys,
          activities: trip.activities,
        };
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    console.log("delete an activity")
    try {
      const deletedActivity = await deleteActivity(activityId);
      console.log("Journey deleted:", deletedActivity);
  
      setTrips(prevState => prevState.map(trip => {
        // const updatedJourneys = trip.journeys.filter(journey => journey.id !== activityId);
        const updatedActivities = trip.activities.filter(activity => activity.id !== activityId);
        return {
          ...trip,
          journeys: trip.journeys,
          activities: updatedActivities,
        };
      }));
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSubmit = async function (e) {
    e.preventDefault();

    const searchedUser = {
      user: putCapLet(lowerCase(e.target[0].value)),
    };

    const constructSearchUrl = function () {
      const arrRes = ["http://localhost:3001/modify?user="];
      arrRes.push(searchedUser.user);
      return arrRes.join("");
    };

    const url = constructSearchUrl();

    const resultOfSearch = await getTripsByUser(url);

    if (resultOfSearch.length === 0) {
      setSearchResult(false);
    } else {
      setSearchResult(true);
    }

    setTrips(resultOfSearch);

    e.target.reset();
  };

  const renderTrips = () => {
    if (searchResult === false) {
      return <h2>No trips found for this user</h2>;
    } else if (trips.length === 0) {
      return null;
    }
    return trips.map((trip) => {
      return (
        <div className="trip-card" key={trip.id}>
          <h3>{trip.name}</h3>
          <p>User: {trip.user}</p>
          <p>Departure City: {putCapLet(trip.depCity)}</p>
          <p>Arrival City: {putCapLet(trip.arrCity)}</p>
          <p>Budget: {trip.budget}</p>
          <p>Duration: {trip.duration} days</p>

          {trip.journeys
            .concat(trip.activities)
            .sort((a, b) => new Date(a.start) - new Date(b.start))
            .map((item) => (
              <div>
                {item.transportType ? (
                  <div className="journey-container" key={item.id}>
                    <li>
                      <h3>
                        {putCapLet(item.transportType)}{" "}
                        to{" "}
                        {putCapLet(item.arrCity)}
                      </h3>
                      <p>Start: {prettyDate(item.start)}</p>
                      <p>End: {prettyDate(item.end)}</p>
                      <p>Departure City: {putCapLet(item.depCity)}</p>
                      <p>Arrival City: {putCapLet(item.arrCity)}</p>
                      <p>Price: {item.price}</p>
                      <button onClick={() => handleDeleteJourney(item.id)}>Delete Journey</button>
                    </li>
                  </div>
                ) : (
                  <div className="activity-container" key={item.id}>
                    <li>
                      <h3>
                        {putCapLet(item.activityType)}
                      </h3>
                      <p>Start: {prettyDate(item.start)}</p>
                      <p>End: {prettyDate(item.end)}</p>
                      <p>Departure City: {item.depCity}</p>
                      {item.arrCity && <p>Arrival City: {item.arrCity}</p>}
                      <p>Price: {item.price}</p>
                      {item.additionalInfo && (
                        <p>Additional Info: {item.additionalInfo}</p>
                      )}
                      <button onClick={() => handleDeleteActivity(item.id)}>Delete Activity</button>
                    </li>
                  </div>
                )}
              </div>
            ))}
        </div>
      );
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>UserName</h4>
        <input className="inputs" placeholder="Name"></input>
        <button className="button" type="submit">
          Search
        </button>
      </form>

      {renderTrips()}

      <Link to="/">
        <button className="button">Back to Home</button>
      </Link>
    </div>
  );
}

export default Modify;
