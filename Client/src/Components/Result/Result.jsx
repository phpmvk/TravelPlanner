import moment from "moment";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./Result.css";

function Result({ searchedTrips }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const putCapLet = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const prettyDate = function (date) {
    return moment(date).format("dddd HH:mm");
  };

  function lowerCase(string) {
    return string.toLowerCase();
  }

  return (
    <div>
      {searchedTrips.map((trip) => {
        console.log("journey", trip.journeys);
        console.log("activities", trip.activities);
        return (
          <div className="trip-card" key={trip.id}>
            <h3>{trip.name}</h3>
            <p>User: {trip.user}</p>
            <p>Departure City: {putCapLet(trip.depCity)}</p>
            <p>Arrival City: {putCapLet(trip.arrCity)}</p>
            <p>Budget: {trip.budget}</p>
            <p>Duration: {trip.duration} days</p>

            <button
              onClick={() => {
                if (selectedTripId !== trip.id) {
                  setSelectedTripId(trip.id);
                  setShowDetails(true);
                } else {
                  setShowDetails(!showDetails);
                }
              }}
            >
              {selectedTripId === trip.id && showDetails
                ? "Hide Details"
                : "Show Details"}
            </button>

            {selectedTripId === trip.id &&
              showDetails &&
              trip.journeys
                .concat(trip.activities)
                .sort((a, b) => new Date(a.start) - new Date(b.start))
                .map((item) => (
                  <div>
                    {item.transportType ? (
                      <div className="journey-container" key={item.id}>
                        <li>
                          <h3>
                            {putCapLet(item.transportType)} to{" "}
                            {putCapLet(item.arrCity)}
                          </h3>
                          <p>Start: {prettyDate(item.start)}</p>
                          <p>End: {prettyDate(item.end)}</p>
                          <p>Departure City: {putCapLet(item.depCity)}</p>
                          <p>Arrival City: {putCapLet(item.arrCity)}</p>
                          <p>Price: {item.price}</p>
                        </li>
                      </div>
                    ) : (
                      <div className="activity-container" key={item.id}>
                        <li>
                          <h3>{putCapLet(item.activityType)}</h3>
                          <p>Start: {prettyDate(item.start)}</p>
                          <p>End: {prettyDate(item.end)}</p>
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
      })}
      <div>
        <Link to="/">
          <button className="button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
