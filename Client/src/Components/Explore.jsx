import { Link } from 'react-router-dom';

function Explore() {
  
    return (
      <div className="Explore">
       <h1>Explore</h1>

       <h4>Start of the Trip</h4>
            <input className="inputs" type="datetime-local" ></input>
        <h4>End of the activity</h4>
            <input className="inputs" type="datetime-local" ></input>
        <h4>Departure City</h4>
            <input className="inputs" placeholder="City"></input>
        <h4>Price</h4>
            <input className="inputs" placeholder="Price"></input>
        <h4>Activities</h4>
            <input className="inputs" placeholder="Name the activities you would like to do"></input>

        <Link to="/result">
            <button className="button">Search</button>
        </Link>

       <Link to="/">
            <button className="button">Home</button>
        </Link>
      </div>
    )
  }
  
  export default Explore