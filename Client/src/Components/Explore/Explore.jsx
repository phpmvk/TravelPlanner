import { Link, useNavigate } from "react-router-dom";
import { parseISO } from "date-fns";
import { useState, React, useEffect } from "react";
import PropTypes from "prop-types";

import { getSearchedTrips, getActivitiesList } from "../../api.service";
import "./Explore.css";

function Explore({ setsearchedTrips }) {
  const [activities, setActivities] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");

  const handleActivitySelect = (e) => {
    const selectedActivity = e.target.value;
    setSelectedActivities([...selectedActivities, selectedActivity]);
  };

  const fetchActivities = async () => {
    const activitiesList = await getActivitiesList();
    const activities = Array.from(
      new Set(activitiesList.map((obj) => obj.activityType))
    );
    console.log("liste des activitées", activities);
    setActivities(activities);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const navigate = useNavigate();

  Explore.propTypes = {
    setsearchedTrips: PropTypes.func.isRequired,
  };

  const putCapLet = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function lowerCase(string) {
    return string.toLowerCase();
  }

  const handleSubmit = async function (e) {
    e.preventDefault();

    const start = parseISO(e.target[0].value);
    const end = parseISO(e.target[1].value);
    const budget = parseFloat(e.target[3].value);

    const newTrip = {
      start: start,
      end: end,
      depCity: putCapLet(lowerCase(e.target[2].value)),
      budget: budget,
      activities: [
        ...selectedActivities,
        ...e.target[4].value.split(",").map(lowerCase).map(putCapLet),
      ],
    };

    function diffMinutes(date1, date2) {
      if (date2 > date1) {
        const diff = Math.abs(date2 - date1);
        return Math.floor(diff / (1000 * 60));
      }
      // A FAIRE !
      // Ajouter une fonction lorsqu'on se situe dans le cas où l'utilisateur a choisit une start date posterieur
      // à la end date où le formulaire ne pourra pas s'envoyer et un message d'erreur sera retourné disant à
      // l'utilsateur rentrer une end date supérieure à la start date
      const diff = Math.abs(date1 - date2);
      return Math.floor(diff / (1000 * 60));
    }

    const constructSearchUrl = function () {
      const arrRes = ["http://localhost:3001/result/?"];
      newTrip.activities.forEach((activity, index) => {
        if (index === 0) {
          arrRes.push("activities=");
        } else {
          arrRes.push("&activities=");
        }
        arrRes.push(activity);
      });
      arrRes.push("&budget=");
      arrRes.push(newTrip.budget);
      arrRes.push("&depCity=");
      arrRes.push(newTrip.depCity);

      return arrRes.join("");
    };

    const url = constructSearchUrl();

    console.log("result of search", url);

    const resultOfSearch = await getSearchedTrips(url);
    console.log("ici a voir", resultOfSearch);
    setsearchedTrips(resultOfSearch);
    e.target.reset();
    navigate("/result");
  };

  return (
    <div className="Explore">
      <h1>Explore</h1>
      <form onSubmit={handleSubmit}>
        <h4>Start of the Trip</h4>
        <input className="inputs" type="datetime-local" required></input>
        <h4>End of the activity</h4>
        <input className="inputs" type="datetime-local" required></input>
        <h4>Departure City</h4>
        <input className="inputs" placeholder="City" required></input>

        <h4>Budget</h4>
        <input
          className="inputs"
          name="budget"
          placeholder="Price"
          required
        ></input>
        <h4>Activities</h4>
        <input
          className="inputs"
          placeholder="Name the activities you would like to do"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
        ></input>

        <button
          className="button"
          type="button"
          onClick={() => {
            setSelectedActivities([...selectedActivities, newActivity]);
            setNewActivity("");
          }}
        >
          Add activity
        </button>

        <select className="inputs" onChange={handleActivitySelect}>
          <option value="">Select activities</option>
          {activities &&
            activities.map((activity, index) => (
              <option key={index} value={activity}>
                {activity}
              </option>
            ))}
        </select>
        <ul>
          {selectedActivities.map((activity, index) => (
            <li key={index}>
              {putCapLet(lowerCase(activity))}{" "}
              <button
              type="button"
              className="buttonRemove"
                onClick={() =>
                  setSelectedActivities(
                    selectedActivities.filter((a) => a !== activity)
                  )
                }
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <button className="button">Search</button>
      </form>

      <Link to="/">
        <button className="button">Home</button>
      </Link>
    </div>
  );
}

export default Explore;
