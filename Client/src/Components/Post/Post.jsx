import { Link, useNavigate } from "react-router-dom";
import { useContext, React } from "react";

import { TripContext } from "../../App";
import { postTrip } from "../../api.service";

import "./Post.css";

function Post() {
  const { currentTrip, setcurrentTrip } = useContext(TripContext);
  // const [error, setError] = useState('');

  const navigate = useNavigate();

  const putCapLet = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function lowerCase(string) {
    return string.toLowerCase();
  }

  const handleSubmit = async function (e) {
    e.preventDefault();

    const budget = parseFloat(e.target[4].value);
    const duration = parseInt(e.target[5].value);

    const newTrip = {
      name: putCapLet(lowerCase(e.target[0].value)),
      user: putCapLet(lowerCase(e.target[1].value)),
      depCity: putCapLet(lowerCase(e.target[2].value)),
      arrCity: putCapLet(lowerCase(e.target[3].value)),
      budget: budget,
      duration: duration,
    };

    console.log(newTrip);
    // Send to back-End
    const currentTrip = await postTrip(newTrip);

    if (currentTrip.id) {
      setcurrentTrip(currentTrip);
      navigate(`/trip/${currentTrip.id}`);
    }

    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create a new trip</h1>
        <h4>Name of your trip</h4>
        <input
          className="inputs"
          placeholder="Give a name to your trip"
        ></input>
        <h4>User</h4>
        <input className="inputs" placeholder="User"></input>
        <h4>Departure City</h4>
        <input className="inputs" placeholder="City"></input>
        <h4>Arrival City</h4>
        <input className="inputs" placeholder="City"></input>
        <h4>Budget</h4>
        <input className="inputs" placeholder="Budget"></input>
        {/* <h4>Duration</h4>
        <input className="inputs" placeholder="Duration"></input> */}
        <button className="button" type="submit">
          Create
        </button>
      </form>

      <Link to="/">
        <button className="button">Home</button>
      </Link>
    </div>
  );
}

export default Post;
