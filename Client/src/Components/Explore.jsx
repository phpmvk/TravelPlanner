import { Link, useNavigate } from 'react-router-dom';
import { parseISO } from 'date-fns'


function Explore() {

    const navigate = useNavigate();

    const handleSubmit = async function(e){
        e.preventDefault()
        
        const start = parseISO(e.target[0].value)
        const end = parseISO(e.target[1].value)
        const budget = parseFloat(e.target[3].value);
        const activities = e.target[4].value.split(",")
        console.log(activities);

               
        const newTrip = {
            start: start,
            end: end,
            depCity: e.target[2].value,
            budget: budget,
            activities: activities
        }

        console.log("newTrip", newTrip);
    
        // const journeyNew = await postJourney(newJourney);
        
        e.target.reset()

        navigate("/result")
    }

    return (
      <div className="Explore">
       <h1>Explore</h1>
       <form onSubmit={handleSubmit}>
       <h4>Start of the Trip</h4>
            <input className="inputs" type="datetime-local" ></input>
        <h4>End of the activity</h4>
            <input className="inputs" type="datetime-local" ></input>
        <h4>Departure City</h4>
            <input className="inputs" placeholder="City"></input>
        <h4>Budget</h4>
            <input className="inputs" placeholder="Price"></input>
        <h4>Activities</h4>
            <input className="inputs" placeholder="Name the activities you would like to do"></input>

            <button className="button">Search</button>

        </form>

       <Link to="/">
            <button className="button">Home</button>
        </Link>
      </div>
    )
  }
  
  export default Explore