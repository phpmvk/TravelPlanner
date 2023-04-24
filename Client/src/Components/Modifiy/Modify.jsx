import { Link } from "react-router-dom";
import { useState, React } from "react";
import moment from "moment";
import { parseISO } from "date-fns";

import "./Modify.css";
import {
  getTripsByUser,
  deleteJourney,
  deleteActivity,
  deleteTrip,
  updateTrip,
  postJourney,
  postActivity,
} from "../../api.service";

function Modify() {
  const [trips, setTrips] = useState([]);
  const [trip, setTrip] = useState({});
  const [searchResult, setSearchResult] = useState(null);
  const [isViewMode, setMode] = useState("viewMode");

  const putCapLet = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const prettyDate = function (date) {
    return moment(date).format("dddd HH:mm");
  };

  function lowerCase(string) {
    return string.toLowerCase();
  }

  const handleDeleteJourney = async (journeyId) => {
    try {
      const deletedJourney = await deleteJourney(journeyId);

      setTrips((prevState) =>
        prevState.map((trip) => {
          const updatedJourneys = trip.journeys.filter(
            (journey) => journey.id !== journeyId
          );
          return {
            ...trip,
            journeys: updatedJourneys,
            activities: trip.activities,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      const deletedActivity = await deleteActivity(activityId);

      setTrips((prevState) =>
        prevState.map((trip) => {
          const updatedActivities = trip.activities.filter(
            (activity) => activity.id !== activityId
          );
          return {
            ...trip,
            journeys: trip.journeys,
            activities: updatedActivities,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      // Delete all activities associated to the trip
      const deletedActivities = await Promise.all(
        trips
          .find((trip) => trip.id === tripId)
          .activities.map((activity) => deleteActivity(activity.id))
      );

      // Delete all journeys associated to the trip
      const deletedJourneys = await Promise.all(
        trips
          .find((trip) => trip.id === tripId)
          .journeys.map((journey) => deleteJourney(journey.id))
      );

      // Delete the trip
      const deletedTrip = await deleteTrip(tripId);

      // Updates the displayed trip list
      setTrips((prevState) => prevState.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.log(error);
    }
  };

  const switchToEditForm = async (trip) => {
    setTrip(trip);
    setMode("editMode");
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    const searchedUser = {
      user: putCapLet(lowerCase(e.target[0].value)),
    };

    fetchTripsByUser(searchedUser.user);

    e.target.reset();
  };

  const fetchTripsByUser = async function (user) {
    const constructSearchUrl = function () {
      const arrRes = ["http://localhost:3001/modify?user="];
      arrRes.push(user);
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
  };

  const handleEditTrip = async function (e) {
    console.log(trips);
    e.preventDefault(); // Empêcher le comportement de soumission par défaut

    try {
      const updatedTrip = await updateTrip(trip);
      console.log("Trip updated:", updatedTrip);
      fetchTripsByUser(updatedTrip.user);
    } catch (error) {
      console.error(error);
    }
    setMode("viewMode");
  };

  const switchToAddJourney = async function (trip) {
    setTrip(trip);
    setMode("addJourneyMode");
  };

  const switchToAddActivity = async function (trip) {
    setTrip(trip);
    setMode("addActivityMode");
  };

  const switchToModifyPage = async function () {
    setMode("viewMode");
  };

  const handleAddJourney = async function (e) {
    console.log("adding a journey");
    e.preventDefault();

    const start = parseISO(e.target[0].value);
    const end = parseISO(e.target[1].value);
    const price = parseFloat(e.target[4].value);

    const newJourney = {
      start: start,
      end: end,
      depCity: putCapLet(lowerCase(e.target[2].value)),
      arrCity: putCapLet(lowerCase(e.target[3].value)),
      price: price,
      transportType: putCapLet(lowerCase(e.target[5].value)),
      idTrip: trip.id,
    };

    console.log("newjourney", newJourney);

    const journeyNew = await postJourney(newJourney);

    fetchTripsByUser(trip.user);

    setMode("viewMode");
  };

  const handleAddActivity = async function (e) {
    console.log("adding an activity");
    e.preventDefault();

    const start = parseISO(e.target[0].value);
    const end = parseISO(e.target[1].value);
    const price = parseFloat(e.target[4].value);

    const newActivity = {
      start: start,
      end: end,
      depCity: putCapLet(lowerCase(e.target[2].value)),
      arrCity: putCapLet(lowerCase(e.target[3].value)),
      price: price,
      activityType: putCapLet(lowerCase(e.target[5].value)),
      additionalInfo: putCapLet(lowerCase(e.target[6].value)),
      idTrip: trip.id,
    };

    const activityNew = await postActivity(newActivity);

    fetchTripsByUser(trip.user);

    setMode("viewMode");
  };

  const renderTrips = () => {
    if (searchResult === false) {
      return <h2>No trips found for this user</h2>;
    } else if (trips.length === 0) {
      return null;
    }
    console.log("trips", trips);
    return trips.map((trip) => {
      return (
        <div className="trip-card" key={trip.id}>
          <h3>{trip.name}</h3>
          <p>User: {trip.user}</p>
          <p>Departure City: {putCapLet(trip.depCity)}</p>
          <p>Arrival City: {putCapLet(trip.arrCity)}</p>
          <p>Budget: {trip.budget}</p>
          <p>Duration: {trip.duration} days</p>
          <button onClick={() => handleDeleteTrip(trip.id)}>Delete Trip</button>
          <button onClick={() => switchToEditForm(trip)}>Edit Trip</button>
          <button onClick={() => switchToAddJourney(trip)}>Add Journey</button>
          <button onClick={() => switchToAddActivity(trip)}>
            Add Activity
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
                      <button onClick={() => handleDeleteJourney(item.id)}>
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
                      <button onClick={() => handleDeleteActivity(item.id)}>
                        Delete Activity
                      </button>
                    </li>
                  </div>
                )}
              </div>
            ))}
        </div>
      );
    });
  };

  const renderEdit = () => {
    // const { currentTrip, setcurrentTrip } = useContext(TripContext);

    // const navigate = useNavigate();

    console.log("trips", trips);

    return (
      <div>
        <form onSubmit={handleEditTrip}>
          <h1>Edit your trip</h1>
          <h4>{trip.name}</h4>
          <input
            className="inputs"
            value={trip.name}
            onChange={(e) => setTrip({ ...trip, name: e.target.value })}
          ></input>
          <h4>User</h4>
          <input
            className="inputs"
            value={trip.user}
            onChange={(e) => setTrip({ ...trip, user: e.target.value })}
          ></input>
          <h4>Departure City</h4>
          <input
            className="inputs"
            value={putCapLet(trip.depCity)}
            onChange={(e) => setTrip({ ...trip, depCity: e.target.value })}
          ></input>
          <h4>Arrival City</h4>
          <input
            className="inputs"
            value={putCapLet(trip.arrCity)}
            onChange={(e) => setTrip({ ...trip, arrCity: e.target.value })}
          ></input>
          <h4>Budget</h4>
          <input
            className="inputs"
            value={trip.budget}
            onChange={(e) => setTrip({ ...trip, budget: e.target.value })}
          ></input>
          <h4>Duration</h4>
          <input
            className="inputs"
            value={trip.duration}
            onChange={(e) => setTrip({ ...trip, duration: e.target.value })}
          ></input>
          <button className="button" type="submit">
            Edit
          </button>
        </form>
      </div>
    );
  };

  const renderAddJourney = () => {
    return (
      <div className="Journey">
        <h1>{trip.name}</h1>
        <form onSubmit={handleAddJourney}>
          <h2>Create a new Journey</h2>
          <h4>Start of the trip</h4>
          <input className="inputs" type="datetime-local"></input>
          <h4>End of the trip</h4>
          <input className="inputs" type="datetime-local"></input>
          <h4>Departure City</h4>
          <input className="inputs" placeholder="City"></input>
          <h4>Arrival City</h4>
          <input className="inputs" placeholder="City"></input>
          <h4>Price</h4>
          <input className="inputs" placeholder="Price"></input>
          <h4>TransportType</h4>
          <input className="inputs" placeholder="Transport used"></input>
          <button className="button" type="submit">
            Create
          </button>
        </form>

        <button className="button" onClick={switchToModifyPage}>
          Cancel journey
        </button>
      </div>
    );
  };

  const renderAddActivity = () => {
    return (
      <div className="Activity">
        <h1>{trip.name}</h1>
        <form onSubmit={handleAddActivity}>
          <h2>Create a new Activity</h2>
          <h4>Start of the activity</h4>
          <input className="inputs" type="datetime-local"></input>
          <h4>End of the activity</h4>
          <input className="inputs" type="datetime-local"></input>
          <h4>Departure City</h4>
          <input className="inputs" placeholder="City"></input>
          <h4>Arrival City</h4>
          <input className="inputs" placeholder="City"></input>
          <h4>Price</h4>
          <input className="inputs" placeholder="Price"></input>
          <h4>Activity name</h4>
          <input className="inputs" placeholder="Name of the activity"></input>
          <h4>Additional Info?</h4>
          <input className="inputs" placeholder="..."></input>
          <button className="button" type="submit">
            Create
          </button>
        </form>

        <button className="button" onClick={switchToModifyPage}>
          Cancel activity
        </button>
      </div>
    );
  };

  return (
    <div>
      {isViewMode === "viewMode" ? (
        <div>
          <form onSubmit={handleSubmit}>
            <h4>UserName</h4>
            <input className="inputs" placeholder="Name"></input>
            <button className="button" type="submit">
              Search
            </button>
          </form>
          {renderTrips()}
        </div>
      ) : isViewMode === "editMode" ? (
        renderEdit()
      ) : isViewMode === "addJourneyMode" ? (
        renderAddJourney()
      ) : isViewMode === "addActivityMode" ? (
        renderAddActivity()
      ) : null}

      <Link to="/">
        <button className="button">Back to Home</button>
      </Link>
    </div>
  );
}

export default Modify;
