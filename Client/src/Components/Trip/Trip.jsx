import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import moment from "moment";
import { parseISO } from "date-fns";

import {
  getTrip,
  deleteJourney,
  deleteActivity,
  deleteTrip,
} from "../../api.service";

function Trip() {
  const id = useParams();
  console.log(id.idTrip);
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  const putCapLet = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const prettyDate = function (date) {
    return moment(date).format("dddd HH:mm");
  };

  function lowerCase(string) {
    return string.toLowerCase();
  }

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const roundedHours = hours % 24;
    const daysString = days > 0 ? `${days} day${days > 1 ? 's' : ''} and ` : '';
    const hoursString = `${roundedHours} hour${roundedHours > 1 ? 's' : ''}`;
    return `${daysString}${hoursString}`;
  }

  const fetchTrip = async () => {
    const data = await getTrip(id.idTrip);
    console.log(data);
    setTrip(data);
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      const deletedActivity = await deleteActivity(activityId);
      // console.log("Journey deleted:", deletedActivity);
      fetchTrip();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteJourney = async (journeyId) => {
    try {
      const deletedJourney = await deleteJourney(journeyId);
      //   console.log("Journey deleted:", deletedJourney);
      fetchTrip();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      const deletedActivities = await Promise.all(
        trip.activities.map((activity) => deleteActivity(activity))
      );
      const deletedJourneys = await Promise.all(
        trip.journeys.map((journey) => deleteJourney(journey))
      );
      const deletedTrip = await deleteTrip(tripId);
      navigate(`/post`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return (
    <div className="Trip">
      <Link to="/activity">
        <button className="button">Post an Activity</button>
      </Link>
      <Link to="/journey">
        <button className="button">Post a Journey</button>
      </Link>

      <Link to="/">
        <button className="button">Home</button>
      </Link>
      {trip && (
        <>
          <h3>{trip.name}</h3>
          <p>User: {trip.user}</p>
          <p>Departure City: {putCapLet(trip && trip.depCity)}</p>
          <p>Arrival City: {putCapLet(trip && trip.arrCity)}</p>
          <p>Budget: {trip.budget}</p>
          <p>Duration: {formatDuration(trip.duration)}</p>
          <button onClick={() => handleDeleteTrip(trip.id)}>
            Delete Trip
          </button>

          {trip.journeys
            .concat(trip.activities)
            .sort((a, b) => new Date(a.start) - new Date(b.start))
            .map((item) => (
              <div key={item.id}>
                {item.transportType ? (
                  <div className="journey-container" key={item.id}>
                    <li>
                      <h3>
                        {item.transportType === "Plane"
                          ? `Flight to ${putCapLet(item.arrCity)}`
                          : item.transportType === "Car"
                          ? `Drive to ${putCapLet(item.arrCity)}`
                          : `${putCapLet(item.transportType)} to ${putCapLet(
                              item.arrCity
                            )}`}
                      </h3>
                      <p>Start: {prettyDate(item.start)}</p>
                      <p>End: {prettyDate(item.end)}</p>
                      <p>Departure City: {putCapLet(item.depCity)}</p>
                      <p>Arrival City: {putCapLet(item.arrCity)}</p>
                      <p>Price: {item.price}</p>
                      <button onClick={() => handleDeleteJourney(item)}>
                        Delete Journey
                      </button>
                    </li>
                  </div>
                ) : (
                  <div className="activity-container" key={item.id}>
                    <li>
                      <h3>{putCapLet(item.activityType)}</h3>
                      <p>Start: {prettyDate(item.start)}</p>
                      <p>End: {prettyDate(item.end)}</p>
                      {item.arrCity ? (
                        <div>
                          <p>Departure City: {item.depCity}</p>
                          <p>Arrival City: {item.arrCity}</p>
                        </div>
                      ) : (
                        <div>
                          <p>Place: {item.depCity}</p>
                        </div>
                      )}
                      <p>Price: {item.price}</p>
                      {item.additionalInfo && (
                        <p>Additional Info: {item.additionalInfo}</p>
                      )}
                      <button onClick={() => handleDeleteActivity(item)}>
                        Delete Activity
                      </button>
                    </li>
                  </div>
                )}
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default Trip;
