import { Link, useNavigate } from "react-router-dom";
import { parseISO } from "date-fns";

import { getSearchedTrips } from "../../api.service";

import "./Explore.css";

function Explore({ setsearchedTrips }) {

  const navigate = useNavigate();

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
      activities: e.target[4].value.split(",").map(lowerCase).map(putCapLet),
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

    // console.log("diff de minutes", diffMinutes(start, end));

    // const arr = e.target[4].value.split(",")

    console.log("Prop activities",newTrip.activities);
    console.log("depCity", newTrip.depCity);
    // console.log(newTrip.end);

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
      setsearchedTrips(resultOfSearch);
      e.target.reset();
      navigate("/result");

  };

  return (
    <div className="Explore">
      <h1>Explore</h1>
      <form onSubmit={handleSubmit}>
        <h4>Start of the Trip</h4>
        <input className="inputs" type="datetime-local"></input>
        <h4>End of the activity</h4>
        <input className="inputs" type="datetime-local"></input>
        <h4>Departure City</h4>
        <input className="inputs" placeholder="City" required></input>

        <h4>Budget</h4>
        <input className="inputs" name="budget" placeholder="Price" required></input>
        {/* <label htmlFor="budget">Mandatory Input</label> */}
        <h4>Activities</h4>
        <input
          className="inputs"
          placeholder="Name the activities you would like to do" required
        ></input>
        <button className="button">Search</button>
      </form>

      <Link to="/">
        <button className="button">Home</button>
      </Link>
    </div>
  );
}


export default Explore;
