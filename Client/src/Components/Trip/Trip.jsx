import { Link, useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
import moment from "moment";
import { parseISO } from "date-fns";

import { getTrip } from "../../api.service";

function Trip() {
  const id = useParams();
  console.log(id.idTrip);
  const [trip, setTrip] = useState(null);

  const putCapLet = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const prettyDate = function (date) {
    return moment(date).format("dddd HH:mm");
  };

  function lowerCase(string) {
    return string.toLowerCase();
  }

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
          <p>Duration: {trip.duration} days</p>

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
                      {/* <button onClick={() => handleDeleteJourney(item.id)}>
                        Delete Journey
                      </button> */}
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
                      {/* <button onClick={() => handleDeleteActivity(item.id)}>
                        Delete Activity
                      </button> */}
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
