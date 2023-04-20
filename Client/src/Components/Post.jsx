import { postTrip } from "../api.service";
import { Link } from 'react-router-dom';

function Post() {
  
    // const [error, setError] = useState('');

    const handleSubmit = async function(e){
    // setError("")
    e.preventDefault()
    
    const budget = parseFloat(e.target[4].value);
    const duration = parseInt(e.target[5].value);
    
    // if (!title || !date || !venue) {
    //   setError('Please fill in all fields.');
    //   return;
    // }
    
    
    const newTrip = {
        name: e.target[0].value,
        user: e.target[1].value,
        depCity: e.target[2].value,
        arrCity: e.target[3].value,
        budget: budget,
        duration: duration,
    }

    // Send to back-End
    const res= await postTrip(newTrip)
    
    e.target.reset()
    }
    
      return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create a new trip</h1>
                <h4>Name of your trip</h4>
            <input className="inputs" placeholder="Give a name to your trip"></input>
                <h4>User</h4>
            <input className="inputs" placeholder="User"></input>
                <h4>Departure City</h4>
            <input className="inputs" placeholder="City"></input>
                <h4>Arrival City</h4>
            <input className="inputs" placeholder="City"></input>
                <h4>Budget</h4>
            <input className="inputs" placeholder="Budget"></input>
                <h4>Duration</h4>
            <input className="inputs" placeholder="Duration"></input>
                {/* <h4>DATE</h4>
            <input className="inputs" type="datetime-local" min={new Date().toISOString().slice(0, 16)}></input> */}
            {/* {error && <p className="error">{error}</p>} */}
            <button className="button" type="submit">Create</button>
            </form>

            <Link to="/">
                <button className="button">Home</button>
            </Link>
            <Link to="/activity">
                <button className="button">Post an Activity</button>
            </Link>
            <Link to="/journey">
                <button className="button">Post a Journey</button>
            </Link>

        </div>
      );
      }
  
  export default Post