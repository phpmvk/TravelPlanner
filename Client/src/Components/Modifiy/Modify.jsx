import { Link } from "react-router-dom";
import "./Modify.css";
import { getTripsByUser /*, getActivitiesByTripId */ } from "../../api.service";
import { useState } from "react";
import moment from "moment";

function Modify() {
  const [trips, setTrips] = useState([]);

  const handleSubmit = async function (e) {
    e.preventDefault();

    const searchedUser = {
      user: e.target[0].value,
    };

    const constructSearchUrl = function () {
      const arrRes = ["http://localhost:3001/modify?user="];
      arrRes.push(searchedUser.user);
      return arrRes.join("");
    };

    const url = constructSearchUrl();

    const resultOfSearch = await getTripsByUser(url);

    setTrips(resultOfSearch);

    e.target.reset();
  };

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

          {/* <h3>Journeys</h3> */}
          {/* <ul>
            {trip.journeys.map((journey) => (
              <div className="journey-container">
                <li key={journey.id}>
                <h3>{journey.transportType.charAt(0).toUpperCase() + journey.transportType.slice(1)} to {journey.arrCity.charAt(0).toUpperCase() + journey.arrCity.slice(1)}</h3>
                  <p>
                    Start: {moment(journey.start).format("DD MMMM YYYY, HH:mm")}
                  </p>
                  <p>
                    End: {moment(journey.end).format("DD MMMM YYYY, HH:mm")}
                  </p>
                  <p>Departure City: {journey.depCity}</p>
                  <p>Arrival City: {journey.arrCity}</p>
                  <p>Price: {journey.price}</p>
                </li>
              </div>
            ))}
          </ul> */}

          {/* <h3>Activities</h3> */}
          {/* <ul>
            {trip.activities.map((activity) => (
              <div className="activity-container">
                <li key={activity.id}>
                  <h3>
                    {activity.activityType.charAt(0).toUpperCase() +
                      activity.activityType.slice(1)}
                  </h3>
                  <p>
                    Start:{" "}
                    {moment(activity.start).format("DD MMMM YYYY, HH:mm")}
                  </p>
                  <p>
                    End: {moment(activity.end).format("DD MMMM YYYY, HH:mm")}
                  </p>
                  <p>Departure City: {activity.depCity}</p>
                  {activity.arrCity && <p>Arrival City: {activity.arrCity}</p>}
                  <p>Price: {activity.price}</p>
                  {activity.additionalInfo && (
                    <p>Additional Info: {activity.additionalInfo}</p>
                  )}
                </li>
              </div>
            ))}
          </ul> */}

          {trip.journeys
            .concat(trip.activities)
            .sort((a, b) => new Date(a.start) - new Date(b.start))
            .map((item) => (
              <div>
                {item.transportType ? (
                  <div className="journey-container" key={item.id}>
                    <li>
                      <h3>
                        {item.transportType.charAt(0).toUpperCase() +
                          item.transportType.slice(1)}{" "}
                        to{" "}
                        {item.arrCity.charAt(0).toUpperCase() +
                          item.arrCity.slice(1)}
                      </h3>
                      <p>
                        Start:{" "}
                        {moment(item.start).format("dddd HH:mm")}
                      </p>
                      <p>
                        End: {moment(item.end).format("dddd HH:mm")}
                      </p>
                      <p>Departure City: {item.depCity}</p>
                      <p>Arrival City: {item.arrCity}</p>
                      <p>Price: {item.price}</p>
                    </li>
                  </div>
                ) : (
                  <div className="activity-container" key={item.id}>
                    <li>
                      <h3>
                        {item.activityType.charAt(0).toUpperCase() +
                          item.activityType.slice(1)}
                      </h3>
                      <p>
                        Start:{" "}
                        {moment(item.start).format("dddd HH:mm")}
                      </p>
                      <p>
                        End: {moment(item.end).format("dddd HH:mm")}
                      </p>
                      <p>Departure City: {item.depCity}</p>
                      {item.arrCity && <p>Arrival City: {item.arrCity}</p>}
                      <p>Price: {item.price}</p>
                      {item.additionalInfo && (
                        <p>Additional Info: {item.additionalInfo}</p>
                      )}
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
          Create
        </button>
      </form>

      {renderTrips()}

      <Link to="/">
        <button className="button">Home</button>
      </Link>
    </div>
  );
}

export default Modify;
